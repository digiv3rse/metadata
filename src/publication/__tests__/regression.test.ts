import { describe, it } from '@jest/globals';
import {
  DiGiClient,
  production,
  ExplorePublicationsOrderByType,
  LimitType,
} from '@digiv3rse/client';

import { formatZodError } from '../../formatters.js';
import { PublicationMetadataSchema } from '../index.js';

function toUsableUrl(src: string) {
  const url = new URL(src);

  switch (url.protocol) {
    case 'ipfs:':
      return `https://cloudflare-ipfs.com/ipfs/${url.hostname}`;

    case 'ar:':
      return `https://arweave.net/${url.hostname}`;

    default:
      return src;
  }
}

async function fetchMetadata(url: string): Promise<unknown> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // ignore 404s
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await response.json();

    return json as unknown;
  } catch {
    return null;
  }
}

async function fetchLastPublications(client: DiGiClient, pages: number) {
  const pagination = await client.explore.publications({
    orderBy: ExplorePublicationsOrderByType.Latest,
    limit: LimitType.Fifty,
  });

  const publications = pagination.items;

  while (--pages) {
    const nextPage = await pagination.next();

    if (nextPage) {
      publications.push(...nextPage.items);
    }
  }

  return publications;
}

describe(`Given the PublicationMetadataSchema`, () => {
  const client = new DiGiClient({
    environment: production,
  });
  const pages = 20;

  describe(`when parsing the last ${pages * 50} publications`, () => {
    it('should pass without errors', async () => {
      const publications = await fetchLastPublications(client, pages);

      await Promise.all(
        publications.map(async (pub: { metadata: { rawURI: string }; id: any }, idx: any) => {
          const url = toUsableUrl(pub.metadata.rawURI);
          const json = await fetchMetadata(url);

          if (!json) {
            // skip in case we can't fetch the metadata
            return;
          }

          const result = PublicationMetadataSchema.safeParse(json);

          if (result.success) {
            return;
          }

          throw new Error(
            `Failed to parse metadata for ${pub.id} at ${idx} (${url}) due to ${formatZodError(
              result.error,
            )}`,
          );
        }),
      );
    }, 200_000);
  });
});
