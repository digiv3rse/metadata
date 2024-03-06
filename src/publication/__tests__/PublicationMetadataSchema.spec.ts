import { describe, it } from '@jest/globals';

import { expectResult } from '../../__helpers__/assertions.js';
import { PublicationMetadataSchema, PublicationSchemaId } from '../index.js';

describe(`Given the PublicationMetadataSchema`, () => {
  describe(`when parsing an empty object`, () => {
    it(`then it should complain about the missing $schema`, () => {
      expectResult(() => PublicationMetadataSchema.safeParse({})).toMatchInlineSnapshot(`
        "fix the following issues
        · "$schema": Invalid discriminator value. Expected 'https://json-schemas.digiv3rse.xyz/publications/article/3.0.0.json' | 'https://json-schemas.digiv3rse.xyz/publications/audio/3.0.0.json' | 'https://json-schemas.digiv3rse.xyz/publications/checking-in/3.0.0.json' | 'https://json-schemas.digiv3rse.xyz/publications/embed/3.0.0.json' | 'https://json-schemas.digiv3rse.xyz/publications/event/3.0.0.json' | 'https://json-schemas.digiv3rse.xyz/publications/image/3.0.0.json' | 'https://json-schemas.digiv3rse.xyz/publications/link/3.0.0.json' | 'https://json-schemas.digiv3rse.xyz/publications/livestream/3.0.0.json' | 'https://json-schemas.digiv3rse.xyz/publications/mint/3.0.0.json' | 'https://json-schemas.digiv3rse.xyz/publications/space/3.0.0.json' | 'https://json-schemas.digiv3rse.xyz/publications/text-only/3.0.0.json' | 'https://json-schemas.digiv3rse.xyz/publications/story/3.0.0.json' | 'https://json-schemas.digiv3rse.xyz/publications/transaction/3.0.0.json' | 'https://json-schemas.digiv3rse.xyz/publications/3d/3.0.0.json' | 'https://json-schemas.digiv3rse.xyz/publications/video/3.0.0.json'"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.ARTICLE_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.ARTICLE_LATEST,
          digi: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.locale": Required
        · "digi.mainContentFocus": Invalid literal value, expected "ARTICLE"
        · "digi.content": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.AUDIO_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.AUDIO_LATEST,
          digi: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.locale": Required
        · "digi.mainContentFocus": Invalid literal value, expected "AUDIO"
        · "digi.audio": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.CHECKING_IN_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.CHECKING_IN_LATEST,
          digi: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.locale": Required
        · "digi.mainContentFocus": Invalid literal value, expected "CHECKING_IN"
        · "digi.location": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.EMBED_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.EMBED_LATEST,
          digi: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.locale": Required
        · "digi.mainContentFocus": Invalid literal value, expected "EMBED"
        · "digi.embed": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.IMAGE_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.IMAGE_LATEST,
          digi: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.locale": Required
        · "digi.mainContentFocus": Invalid literal value, expected "IMAGE"
        · "digi.image": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.LINK_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.LINK_LATEST,
          digi: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.locale": Required
        · "digi.mainContentFocus": Invalid literal value, expected "LINK"
        · "digi.sharingLink": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.LIVESTREAM_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.LIVESTREAM_LATEST,
          digi: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.locale": Required
        · "digi.mainContentFocus": Invalid literal value, expected "LIVESTREAM"
        · "digi.startsAt": Required
        · "digi.playbackUrl": Required
        · "digi.liveUrl": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.MINT_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.MINT_LATEST,
          digi: {
            mintLink: ' ',
          },
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.locale": Required
        · "digi.mainContentFocus": Invalid literal value, expected "MINT"
        · "digi.mintLink": expected to match one of the following groups:
        		String must contain at least 6 character(s); Should be a valid URI
        	OR:
        		Should be a valid encrypted value."
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.SPACE_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.SPACE_LATEST,
          digi: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.locale": Required
        · "digi.mainContentFocus": Invalid literal value, expected "SPACE"
        · "digi.title": Required
        · "digi.link": Required
        · "digi.startsAt": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.STORY_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.STORY_LATEST,
          digi: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.locale": Required
        · "digi.mainContentFocus": Invalid literal value, expected "STORY"
        · "digi.asset": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.TEXT_ONLY_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.TEXT_ONLY_LATEST,
          digi: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.locale": Required
        · "digi.mainContentFocus": Invalid literal value, expected "TEXT_ONLY"
        · "digi.content": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.THREE_D_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.THREE_D_LATEST,
          digi: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.locale": Required
        · "digi.mainContentFocus": Invalid literal value, expected "3D"
        · "digi.assets": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.TRANSACTION_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.TRANSACTION_LATEST,
          digi: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.locale": Required
        · "digi.mainContentFocus": Invalid literal value, expected "TRANSACTION"
        · "digi.txHash": Required
        · "digi.type": Required
        · "digi.chainId": Required"
      `);
    });
  });

  describe(`when parsing an invalid ${PublicationSchemaId.VIDEO_LATEST}`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        PublicationMetadataSchema.safeParse({
          $schema: PublicationSchemaId.VIDEO_LATEST,
          digi: {},
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.locale": Required
        · "digi.mainContentFocus": expected to match one of the following groups:
        		"digi.mainContentFocus": Invalid literal value, expected "SHORT_VIDEO"
        	OR:
        		"digi.mainContentFocus": Invalid literal value, expected "VIDEO"
        · "digi.video": Required"
      `);
    });
  });
});
