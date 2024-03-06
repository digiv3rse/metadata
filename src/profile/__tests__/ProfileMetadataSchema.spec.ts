import { describe, it } from '@jest/globals';

import { expectResult } from '../../__helpers__/assertions.js';
import { ProfileMetadataSchema } from '../ProfileMetadataSchema.js';

describe(`Given the ProfileMetadataSchema`, () => {
  describe(`when parsing an invalid object`, () => {
    it(`then it should flag the missing fields`, () => {
      expectResult(() =>
        ProfileMetadataSchema.safeParse({
          $schema: 'https://json-schemas.digiv3rse.xyz/profile/2.0.0.json',
          digi: {
            name: 42,

            bio: true,

            picture: '¯_(ツ)_/¯',

            coverPicture: '¯_(ツ)_/¯',

            attributes: {
              foo: 42,
            },
          },
        }),
      ).toMatchInlineSnapshot(`
        "fix the following issues
        · "digi.id": Required
        · "digi.name": Expected string, received number
        · "digi.bio": Expected string, received boolean
        · "digi.picture": Should be a valid URI
        · "digi.coverPicture": Should be a valid URI
        · "digi.attributes": Expected array, received object"
      `);
    });
  });
});
