import { z } from 'zod';

/**
 * Branding helper type.
 *
 * @internal
 */
type Brand<T, TBrand, ReservedName extends string = '__type__'> = T & {
    [K in ReservedName]: TBrand;
};
/**
 * Omits properties from an union type, preserving the union.
 * @internal
 */
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
/**
 * Overwrites properties from T1 with one from T2
 * @internal
 * @example
 * ```ts
 * Overwrite<{ foo: boolean, bar: string }, { foo: number }> // { foo: number, bar: string }
 * ```
 */
type Overwrite<T1, T2> = DistributiveOmit<T1, keyof T2> & T2;
/**
 * Declares an array of at least two elements of the specified type.
 */
type TwoAtLeastArray<T> = [T, T, ...T[]];
/**
 * Beautify the  readout of all of the members of that intersection.
 *
 * As seen on tv: https://twitter.com/mattpocockuk/status/1622730173446557697
 *
 * @internal
 */
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
/**
 * @internal
 */
type ShapeCheck<T> = T extends {
    $schema: string;
    digi: unknown;
    signature?: Signature;
} ? T : never;

/**
 * A locale identifier.
 *
 * Syntax: [language]-[region] where:
 * - [language] is a lowercase ISO 639-1 language code
 * - [region] is an optional uppercase ISO 3166-1 alpha-2 country code
 *
 * You can pass just the language code, or both the language and region codes.
 *
 * @example
 * - `en` any English
 * - `en-US` English as used in the United States
 * - `en-GB` English as used in the United Kingdom
 */
type Locale = Brand<string, 'Locale'>;
/**
 * @internal
 */
declare function toLocale(value: string): Locale;
/**
 * @internal
 */
declare const LocaleSchema: z.ZodType<Locale, z.ZodTypeDef, unknown>;
/**
 * A base64 encoded encrypted string value.
 */
type EncryptedString = Brand<string, 'EncryptedValue'>;
/**
 * @internal
 */
declare const EncryptedStringSchema: z.ZodEffects<z.ZodString, EncryptedString, string>;
/**
 * Modifies a schema to accept an encrypted string value as well as its decrypted version.
 *
 * @internal
 */
declare function encryptable<T extends string>(schema: z.ZodType<T, z.ZodTypeDef, unknown>): z.ZodEffects<z.ZodCatch<z.ZodUnion<readonly [z.ZodType<T, z.ZodTypeDef, unknown>, z.ZodEffects<z.ZodString, EncryptedString, string>]>>, EncryptedString | T, unknown>;
/**
 * @internal
 */
declare function nonEmpty(schema: z.ZodString): z.ZodType<string, z.ZodTypeDef, unknown>;
/**
 * @internal
 */
declare function nonEmptyStringSchema(description?: string): z.ZodType<string, z.ZodTypeDef, unknown>;
/**
 * @internal
 */
declare function encryptableStringSchema(description: string): z.ZodEffects<z.ZodCatch<z.ZodUnion<readonly [z.ZodType<string, z.ZodTypeDef, unknown>, z.ZodEffects<z.ZodString, EncryptedString, string>]>>, string | EncryptedString, unknown>;
/**
 * An arbitrary string or its encrypted version.
 *
 * For example in the context of a token-gated publication, fields of this type are encrypted.
 */
type EncryptableString = string | EncryptedString;
/**
 * An arbitrary label.
 *
 * All lowercased, 50 characters max.
 */
type Tag = Brand<string, 'Tag'>;
/**
 * @internal
 */
declare function toTag(value: string): Tag;
/**
 * @internal
 */
declare const TagSchema: z.ZodType<Tag, z.ZodTypeDef, string>;
/**
 * A unique DiGi App identifier.
 */
type AppId = Brand<string, 'AppId'>;
/**
 * @internal
 */
declare function toAppId(value: string): AppId;
/**
 * @internal
 */
declare const AppIdSchema: z.ZodType<AppId, z.ZodTypeDef, string>;
/**
 * A cryptographic signature.
 */
type Signature = Brand<string, 'Signature'>;
/**
 * @internal
 */
declare function toSignature(value: string): Signature;
/**
 * @internal
 */
declare const SignatureSchema: z.ZodType<Signature, z.ZodTypeDef, unknown>;
/**
 * A markdown text.
 */
type Markdown = Brand<string, 'Markdown'>;
/**
 * @internal
 */
declare function toMarkdown(value: string): Markdown;
/**
 * @internal
 */
declare function markdown(schema: z.ZodType<string, z.ZodTypeDef, unknown>): z.ZodType<Markdown, z.ZodTypeDef, unknown>;
/**
 * A markdown text or its encrypted version.
 *
 * For example in the context of a token-gated publication, fields of this type are encrypted.
 */
type EncryptableMarkdown = Markdown | EncryptedString;
/**
 * A Uniform Resource Identifier.
 *
 * It could be a URL pointing to a specific resource,
 * an IPFS URI (e.g. ipfs://Qm...), or an Arweave URI (e.g. ar://Qm...).
 */
type URI = Brand<string, 'URI'>;
/**
 * @internal
 */
declare function toUri(value: string): URI;
/**
 * @internal
 */
declare function uriSchema(description?: string): z.ZodType<URI, z.ZodTypeDef, unknown>;
/**
 * @internal
 */
declare function encryptableUriSchema(description?: string): z.ZodEffects<z.ZodCatch<z.ZodUnion<readonly [z.ZodType<URI, z.ZodTypeDef, unknown>, z.ZodEffects<z.ZodString, EncryptedString, string>]>>, EncryptedString | URI, unknown>;
/**
 * A URI or its encrypted version.
 *
 * For example in the context of a token-gated publication, fields of this type are encrypted.
 */
type EncryptableURI = URI | EncryptedString;
/**
 * A Geographic coordinate as subset of Geo URI (RFC 5870).
 *
 * Currently only supports the `geo:lat,lng` format.
 *
 * Use the {@link geoUri} helper to create one, do not attempt to create one manually.
 *
 * @example
 * ```ts
 * 'geo:40.689247,-74.044502'
 *
 * 'geo:41.890209,12.492231'
 * ```
 *
 * @see https://tools.ietf.org/html/rfc5870
 */
type GeoURI = `geo:${number},${number}`;
/**
 * @internal
 */
declare const GeoURISchema: z.ZodEffects<z.ZodString, `geo:${number},${number}`, string>;
/**
 * A geographic point on the Earth.
 */
type GeoPoint = {
    /**
     * The latitude in decimal degrees (from -90° to +90°).
     */
    lat: number;
    /**
     * The longitude in decimal degrees (from -180° to +180°).
     */
    lng: number;
};
/**
 * @internal
 */
declare const GeoPointSchema: z.ZodType<GeoPoint, z.ZodTypeDef, object>;
/**
 * Helper to create a Geo URI from a {@link GeoPoint}.
 *
 * @category Helpers
 * @example
 * ```ts
 * geoUri({ lat: 40.689247, lng: -74.044502 }) // 'geo:40.689247,-74.044502'
 *
 * geoUri({ lat: 41.890209, lng: 12.492231 }) // 'geo:41.890209,12.492231'
 * ```
 */
declare function geoUri(point: GeoPoint): GeoURI;
/**
 * Helper to parse a {@link GeoPoint} from a {@link GeoURI}.
 *
 * @category Helpers
 */
declare function geoPoint(value: GeoURI): GeoPoint;
/**
 * @internal
 */
declare function encryptableGeoUriSchema(description: string): z.ZodEffects<z.ZodCatch<z.ZodUnion<readonly [z.ZodType<`geo:${number},${number}`, z.ZodTypeDef, unknown>, z.ZodEffects<z.ZodString, EncryptedString, string>]>>, EncryptedString | `geo:${number},${number}`, unknown>;
/**
 * A Geo URI or its encrypted version.
 *
 * For example in the context of a token-gated publication, fields of this type are encrypted.
 */
type EncryptableGeoURI = GeoURI | EncryptedString;
/**
 * The address of a physical location.
 */
type PhysicalAddress = {
    /**
     * The full mailing address formatted for display.
     */
    formatted?: EncryptableString;
    /**
     * The street address including house number, street name, P.O. Box,
     * apartment or unit number and extended multi-line address information.
     */
    streetAddress?: EncryptableString;
    /**
     * The city or locality.
     */
    locality: EncryptableString;
    /**
     * The state or region.
     */
    region?: EncryptableString;
    /**
     * The zip or postal code.
     */
    postalCode?: EncryptableString;
    /**
     * The country name component.
     */
    country: EncryptableString;
};
/**
 * @internal
 */
declare const PhysicalAddressSchema: z.ZodType<PhysicalAddress, z.ZodTypeDef, object>;
/**
 * An ISO 8601 in the JS simplified format: `YYYY-MM-DDTHH:mm:ss.sssZ`.
 */
type DateTime = Brand<string, 'DateTime'>;
/**
 * @internal
 */
declare function toDateTime(value: string): DateTime;
/**
 * @internal
 */
declare function datetimeSchema(description: string): z.ZodType<DateTime, z.ZodTypeDef, unknown>;
/**
 * @internal
 */
declare function encryptableDateTimeSchema(description: string): z.ZodEffects<z.ZodCatch<z.ZodUnion<readonly [z.ZodType<DateTime, z.ZodTypeDef, unknown>, z.ZodEffects<z.ZodString, EncryptedString, string>]>>, EncryptedString | DateTime, unknown>;
/**
 * A DateTime or its encrypted version.
 *
 * For example in the context of a token-gated publication, fields of this type are encrypted.
 */
type EncryptableDateTime = DateTime | EncryptedString;
/**
 * An EVM compatible address.
 */
type EvmAddress = Brand<string, 'EvmAddress'>;
/**
 * @internal
 */
declare function toEvmAddress(value: string): EvmAddress;
/**
 * @internal
 */
declare const EvmAddressSchema: z.ZodType<EvmAddress, z.ZodTypeDef, unknown>;
/**
 * An EVM compatible Chain Id.
 */
type ChainId = Brand<number, 'ChainId'>;
/**
 * @internal
 */
declare function toChainId(value: number): ChainId;
/**
 * @internal
 */
declare const ChainIdSchema: z.ZodType<ChainId, z.ZodTypeDef, unknown>;
/**
 * An EVM compatible address on a specific chain.
 */
type NetworkAddress = {
    /**
     * The chain id.
     */
    chainId: ChainId;
    /**
     * The EVM address.
     */
    address: EvmAddress;
};
/**
 * @internal
 */
declare const NetworkAddressSchema: z.ZodType<NetworkAddress, z.ZodTypeDef, unknown>;
/**
 * An NFT token identifier.
 */
type TokenId = Brand<string, 'TokenId'>;
/**
 * @internal
 */
declare function toTokenId(value: string): TokenId;
/**
 * @internal
 */
declare const TokenIdSchema: z.ZodType<TokenId, z.ZodTypeDef, unknown>;
/**
 * A Fungible Tokens. Usually an ERC20 token.
 */
type Asset = {
    /**
     * The asset contract address.
     */
    contract: NetworkAddress;
    /**
     * The number of decimals of the asset (e.g. 18 for WETH)
     */
    decimals: number;
};
/**
 * @internal
 */
declare const AssetSchema: z.ZodType<Asset, z.ZodTypeDef, unknown>;
/**
 * Creates an {@link Asset}.
 *
 * @internal
 */
declare function asset(contract: NetworkAddressDetails, decimals: number): Asset;
/**
 * An amount of a specific asset.
 */
type Amount = {
    /**
     * The asset.
     *
     * See {@link asset} helper to create one.
     */
    asset: Asset;
    /**
     * The amount in the smallest unit of the given asset (e.g. wei for ETH).
     */
    value: string;
};
/**
 * @internal
 */
declare const AmountSchema: z.ZodType<Amount, z.ZodTypeDef, unknown>;
type NetworkAddressDetails = {
    /**
     * The chain id.
     */
    chainId: number;
    /**
     * The EVM address.
     */
    address: string;
};
/**
 * @internal
 */
type AmountDetails = {
    contract: NetworkAddressDetails;
    decimals: number;
    value: string;
};
/**
 * @internal
 */
declare function amount(input: AmountDetails): Amount;
/**
 * A DiGi Profile identifier.
 *
 * @example
 * ```
 * 0x01
 * ```
 */
type ProfileId = Brand<string, 'ProfileId'>;
/**
 * @internal
 */
declare function toProfileId(value: string): ProfileId;
/**
 * @internal
 */
declare const ProfileIdSchema: z.ZodType<ProfileId, z.ZodTypeDef, unknown>;
/**
 * A DiGi Publication identifier.
 *
 * No Momoka publications for now.
 *
 * @example
 * ```
 * 0x01-0x01
 * ```
 */
type PublicationId = Brand<string, 'PublicationId'>;
/**
 * @internal
 */
declare function toPublicationId(value: string): PublicationId;
/**
 * @internal
 */
declare const PublicationIdSchema: z.ZodType<PublicationId, z.ZodTypeDef, unknown>;

/**
 * The display type of a marketplace metadata attribute.
 *
 * @see https://docs.opensea.io/docs/metadata-standards#attributes
 */
declare enum MarketplaceMetadataAttributeDisplayType {
    NUMBER = "number",
    STRING = "string",
    DATE = "date"
}
/**
 * A marketplace metadata attribute.
 *
 * @see https://docs.opensea.io/docs/metadata-standards#attributes
 */
type MarketplaceMetadataAttribute = {
    value?: string | number | undefined;
    display_type?: MarketplaceMetadataAttributeDisplayType | undefined;
    trait_type?: string | undefined;
};
/**
 * @internal
 */
declare const MarketplaceMetadataAttributeSchema: z.ZodType<MarketplaceMetadataAttribute, z.ZodTypeDef, object>;
/**
 * The metadata standard for marketplace(s).
 *
 * @see https://docs.opensea.io/docs/metadata-standards#metadata-structure
 */
type MarketplaceMetadata = {
    /**
     * A human-readable description of the item. It could be plain text or markdown.
     */
    description?: Markdown | null;
    /**
     * This is the URL that will appear below the asset's image on OpenSea and others etc.
     * and will allow users to leave OpenSea and view the item on the site.
     */
    external_url?: URI | null;
    /**
     * Name of the NFT item.
     */
    name?: string;
    /**
     * These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the item.
     *
     * @see https://docs.opensea.io/docs/metadata-standards#attributes
     */
    attributes?: MarketplaceMetadataAttribute[];
    /**
     * Marketplaces will store any NFT image here.
     */
    image?: URI | null;
    /**
     * A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV,
     * and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA.
     * `animation_url` also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas,
     * WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.
     */
    animation_url?: URI | null;
};
/**
 * @internal
 */
declare const MarketplaceMetadataSchema: z.ZodObject<{
    description: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<Markdown, z.ZodTypeDef, unknown>>>>;
    external_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    name: z.ZodOptional<z.ZodString>;
    attributes: z.ZodCatch<z.ZodOptional<z.ZodArray<z.ZodType<MarketplaceMetadataAttribute, z.ZodTypeDef, object>, "many">>>;
    image: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    animation_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    description: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<Markdown, z.ZodTypeDef, unknown>>>>;
    external_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    name: z.ZodOptional<z.ZodString>;
    attributes: z.ZodCatch<z.ZodOptional<z.ZodArray<z.ZodType<MarketplaceMetadataAttribute, z.ZodTypeDef, object>, "many">>>;
    image: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    animation_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    description: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<Markdown, z.ZodTypeDef, unknown>>>>;
    external_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    name: z.ZodOptional<z.ZodString>;
    attributes: z.ZodCatch<z.ZodOptional<z.ZodArray<z.ZodType<MarketplaceMetadataAttribute, z.ZodTypeDef, object>, "many">>>;
    image: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    animation_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
}, z.ZodTypeAny, "passthrough">>;

declare enum EncryptionProvider {
    LIT_PROTOCOL = "LIT_PROTOCOL"
}
declare enum NftContractType {
    ERC721 = "ERC721",
    ERC1155 = "ERC1155"
}
declare enum ConditionType {
    NFT_OWNERSHIP = "NFT_OWNERSHIP",
    ERC20_OWNERSHIP = "ERC20_OWNERSHIP",
    EOA_OWNERSHIP = "EOA_OWNERSHIP",
    PROFILE_OWNERSHIP = "PROFILE_OWNERSHIP",
    FOLLOW = "FOLLOW",
    COLLECT = "COLLECT",
    ADVANCED_CONTRACT = "ADVANCED_CONTRACT",
    AND = "AND",
    OR = "OR"
}
type NftOwnershipCondition = {
    type: ConditionType.NFT_OWNERSHIP;
    contractType: NftContractType;
    contract: NetworkAddress;
    tokenIds?: TokenId[];
};
/**
 * @private
 */
declare function refineNftOwnershipCondition(condition: NftOwnershipCondition, ctx: z.RefinementCtx): void;
/**
 * @internal
 */
declare const NftOwnershipConditionSchema: z.ZodObject<{
    type: z.ZodLiteral<ConditionType.NFT_OWNERSHIP>;
    contract: z.ZodType<NetworkAddress, z.ZodTypeDef, unknown>;
    contractType: z.ZodNativeEnum<typeof NftContractType>;
    tokenIds: z.ZodOptional<z.ZodArray<z.ZodType<TokenId, z.ZodTypeDef, unknown>, "many">>;
}, "strip", z.ZodTypeAny, {
    type: ConditionType.NFT_OWNERSHIP;
    contract: NetworkAddress;
    contractType: NftContractType;
    tokenIds?: TokenId[] | undefined;
}, {
    type: ConditionType.NFT_OWNERSHIP;
    contractType: NftContractType;
    contract?: unknown;
    tokenIds?: unknown[] | undefined;
}>;
declare enum ConditionComparisonOperator {
    EQUAL = "EQUAL",
    NOT_EQUAL = "NOT_EQUAL",
    GREATER_THAN = "GREATER_THAN",
    GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
    LESS_THAN = "LESS_THAN",
    LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL"
}
type Erc20OwnershipCondition = {
    type: ConditionType.ERC20_OWNERSHIP;
    amount: Amount;
    condition: ConditionComparisonOperator;
};
/**
 * @internal
 */
declare const Erc20OwnershipConditionSchema: z.ZodObject<{
    type: z.ZodLiteral<ConditionType.ERC20_OWNERSHIP>;
    amount: z.ZodType<Amount, z.ZodTypeDef, unknown>;
    condition: z.ZodNativeEnum<typeof ConditionComparisonOperator>;
}, "strip", z.ZodTypeAny, {
    type: ConditionType.ERC20_OWNERSHIP;
    amount: Amount;
    condition: ConditionComparisonOperator;
}, {
    type: ConditionType.ERC20_OWNERSHIP;
    condition: ConditionComparisonOperator;
    amount?: unknown;
}>;
type EoaOwnershipCondition = {
    type: ConditionType.EOA_OWNERSHIP;
    address: EvmAddress;
};
/**
 * @internal
 */
declare const EoaOwnershipConditionSchema: z.ZodObject<{
    type: z.ZodLiteral<ConditionType.EOA_OWNERSHIP>;
    address: z.ZodType<EvmAddress, z.ZodTypeDef, unknown>;
}, "strip", z.ZodTypeAny, {
    type: ConditionType.EOA_OWNERSHIP;
    address: string & {
        __type__: "EvmAddress";
    };
}, {
    type: ConditionType.EOA_OWNERSHIP;
    address?: unknown;
}>;
type ProfileOwnershipCondition = {
    type: ConditionType.PROFILE_OWNERSHIP;
    profileId: ProfileId;
};
/**
 * @internal
 */
declare const ProfileOwnershipConditionSchema: z.ZodObject<{
    type: z.ZodLiteral<ConditionType.PROFILE_OWNERSHIP>;
    profileId: z.ZodType<ProfileId, z.ZodTypeDef, unknown>;
}, "strip", z.ZodTypeAny, {
    type: ConditionType.PROFILE_OWNERSHIP;
    profileId: string & {
        __type__: "ProfileId";
    };
}, {
    type: ConditionType.PROFILE_OWNERSHIP;
    profileId?: unknown;
}>;
type FollowCondition = {
    type: ConditionType.FOLLOW;
    follow: ProfileId;
};
/**
 * @internal
 */
declare const FollowConditionSchema: z.ZodObject<{
    type: z.ZodLiteral<ConditionType.FOLLOW>;
    follow: z.ZodType<ProfileId, z.ZodTypeDef, unknown>;
}, "strip", z.ZodTypeAny, {
    type: ConditionType.FOLLOW;
    follow: string & {
        __type__: "ProfileId";
    };
}, {
    type: ConditionType.FOLLOW;
    follow?: unknown;
}>;
type CollectCondition = {
    type: ConditionType.COLLECT;
    publicationId: PublicationId;
    thisPublication: boolean;
};
/**
 * @internal
 */
declare const CollectConditionSchema: z.ZodObject<{
    type: z.ZodLiteral<ConditionType.COLLECT>;
    publicationId: z.ZodType<PublicationId, z.ZodTypeDef, unknown>;
    thisPublication: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    type: ConditionType.COLLECT;
    publicationId: string & {
        __type__: "PublicationId";
    };
    thisPublication: boolean;
}, {
    type: ConditionType.COLLECT;
    publicationId?: unknown;
    thisPublication?: boolean | undefined;
}>;
type AdvancedContractCondition = {
    type: ConditionType.ADVANCED_CONTRACT;
    contract: NetworkAddress;
    functionName: string;
    abi: string;
    params: string[];
    comparison: ConditionComparisonOperator;
    value: string;
};
/**
 * @internal
 */
declare const AdvancedContractConditionSchema: z.ZodObject<{
    type: z.ZodLiteral<ConditionType.ADVANCED_CONTRACT>;
    contract: z.ZodType<NetworkAddress, z.ZodTypeDef, unknown>;
    functionName: z.ZodString;
    abi: z.ZodString;
    params: z.ZodArray<z.ZodString, "many">;
    comparison: z.ZodNativeEnum<typeof ConditionComparisonOperator>;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    params: string[];
    type: ConditionType.ADVANCED_CONTRACT;
    contract: NetworkAddress;
    functionName: string;
    abi: string;
    comparison: ConditionComparisonOperator;
}, {
    value: string;
    params: string[];
    type: ConditionType.ADVANCED_CONTRACT;
    functionName: string;
    abi: string;
    comparison: ConditionComparisonOperator;
    contract?: unknown;
}>;
type SimpleCondition = CollectCondition | AdvancedContractCondition | EoaOwnershipCondition | Erc20OwnershipCondition | FollowCondition | NftOwnershipCondition | ProfileOwnershipCondition;
type BaseCondition = {
    type: ConditionType;
};
type ComposableConditionSchema<T extends BaseCondition = BaseCondition> = z.ZodObject<{
    type: z.ZodTypeAny;
} & z.ZodRawShape, z.UnknownKeysParam, z.ZodTypeAny, T>;
type AndCondition<T extends BaseCondition = SimpleCondition> = {
    type: ConditionType.AND;
    criteria: TwoAtLeastArray<T>;
};
/**
 * @internal
 */
declare const AndConditionSchema: ComposableConditionSchema<AndCondition<{
    type: ConditionType.NFT_OWNERSHIP;
    contract: NetworkAddress;
    contractType: NftContractType;
    tokenIds?: TokenId[] | undefined;
} | {
    type: ConditionType.ERC20_OWNERSHIP;
    amount: Amount;
    condition: ConditionComparisonOperator;
} | {
    type: ConditionType.EOA_OWNERSHIP;
    address: string & {
        __type__: "EvmAddress";
    };
} | {
    type: ConditionType.PROFILE_OWNERSHIP;
    profileId: string & {
        __type__: "ProfileId";
    };
} | {
    type: ConditionType.FOLLOW;
    follow: string & {
        __type__: "ProfileId";
    };
} | {
    type: ConditionType.COLLECT;
    publicationId: string & {
        __type__: "PublicationId";
    };
    thisPublication: boolean;
} | {
    value: string;
    params: string[];
    type: ConditionType.ADVANCED_CONTRACT;
    contract: NetworkAddress;
    functionName: string;
    abi: string;
    comparison: ConditionComparisonOperator;
}>>;
type OrCondition<T extends BaseCondition = SimpleCondition> = {
    type: ConditionType.OR;
    criteria: TwoAtLeastArray<T>;
};
/**
 * @internal
 */
declare const OrConditionSchema: ComposableConditionSchema<OrCondition<{
    type: ConditionType.NFT_OWNERSHIP;
    contract: NetworkAddress;
    contractType: NftContractType;
    tokenIds?: TokenId[] | undefined;
} | {
    type: ConditionType.ERC20_OWNERSHIP;
    amount: Amount;
    condition: ConditionComparisonOperator;
} | {
    type: ConditionType.EOA_OWNERSHIP;
    address: string & {
        __type__: "EvmAddress";
    };
} | {
    type: ConditionType.PROFILE_OWNERSHIP;
    profileId: string & {
        __type__: "ProfileId";
    };
} | {
    type: ConditionType.FOLLOW;
    follow: string & {
        __type__: "ProfileId";
    };
} | {
    type: ConditionType.COLLECT;
    publicationId: string & {
        __type__: "PublicationId";
    };
    thisPublication: boolean;
} | {
    value: string;
    params: string[];
    type: ConditionType.ADVANCED_CONTRACT;
    contract: NetworkAddress;
    functionName: string;
    abi: string;
    comparison: ConditionComparisonOperator;
}>>;
type AnyCondition = SimpleCondition | AndCondition<SimpleCondition> | OrCondition<SimpleCondition>;
type AccessCondition = OrCondition<AnyCondition>;
/**
 * @internal
 */
declare const AccessConditionSchema: z.ZodType<AccessCondition, z.ZodTypeDef, object>;
/**
 * A symmetric encryption key.
 */
type LitEncryptionKey = Brand<string, 'LitEncryptionKey'>;
/**
 * @internal
 */
declare function toLitEncryptionKey(value: string): LitEncryptionKey;
/**
 * @internal
 */
declare const LitEncryptionKeySchema: z.Schema<LitEncryptionKey, z.ZodTypeDef, string>;
/**
 * @internal
 */
declare const EncryptedPaths: z.ZodArray<z.ZodType<string, z.ZodTypeDef, unknown>, "many">;
type EncryptedPaths = z.infer<typeof EncryptedPaths>;
type LitEncryptionStrategy = {
    provider: EncryptionProvider;
    encryptionKey: LitEncryptionKey;
    accessCondition: AccessCondition;
    encryptedPaths: string[];
};
/**
 * @internal
 */
declare const LitEncryptionStrategySchema: z.ZodObject<{
    provider: z.ZodLiteral<EncryptionProvider>;
    encryptionKey: z.ZodType<LitEncryptionKey, z.ZodTypeDef, string>;
    accessCondition: z.ZodType<AccessCondition, z.ZodTypeDef, object>;
    encryptedPaths: z.ZodArray<z.ZodType<string, z.ZodTypeDef, unknown>, "many">;
}, "strip", z.ZodTypeAny, {
    provider: EncryptionProvider;
    encryptionKey: string & {
        __type__: "LitEncryptionKey";
    };
    accessCondition: AccessCondition;
    encryptedPaths: string[];
}, {
    provider: EncryptionProvider;
    encryptionKey: string;
    accessCondition: object;
    encryptedPaths: unknown[];
}>;
/**
 * The publication encryption strategy.
 *
 * This is normally populated by the DiGi SDK so the vast majority of developers will not need to use this directly.
 */
type PublicationEncryptionStrategy = LitEncryptionStrategy;
/**
 * @internal
 */
declare const PublicationEncryptionStrategySchema: z.ZodType<PublicationEncryptionStrategy, z.ZodTypeDef, object>;

/**
 * The type of a metadata attribute.
 */
declare enum MetadataAttributeType {
    BOOLEAN = "Boolean",
    DATE = "Date",
    NUMBER = "Number",
    STRING = "String",
    JSON = "JSON"
}
type BooleanAttribute = {
    /**
     * A JS boolean value serialized as string. It's consumer responsibility to parse it.
     */
    value: 'true' | 'false';
    /**
     * Union discriminant.
     */
    type: MetadataAttributeType.BOOLEAN;
    /**
     * The attribute's unique identifier.
     */
    key: string;
};
/**
 * @internal
 */
declare const BooleanAttributeSchema: z.ZodObject<{
    type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
    key: z.ZodType<string, z.ZodTypeDef, unknown>;
    value: z.ZodEnum<["true", "false"]>;
}, "strip", z.ZodTypeAny, {
    value: "true" | "false";
    type: MetadataAttributeType.BOOLEAN;
    key: string;
}, {
    value: "true" | "false";
    type: MetadataAttributeType.BOOLEAN;
    key?: unknown;
}>;
type DateAttribute = {
    /**
     * A valid ISO 8601 date string.  It's consumer responsibility to parse it.
     */
    value: string;
    /**
     * Union discriminant.
     */
    type: MetadataAttributeType.DATE;
    /**
     * The attribute's unique identifier.
     */
    key: string;
};
/**
 * @internal
 */
declare const DateAttributeSchema: z.ZodObject<{
    type: z.ZodLiteral<MetadataAttributeType.DATE>;
    key: z.ZodType<string, z.ZodTypeDef, unknown>;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: MetadataAttributeType.DATE;
    key: string;
}, {
    value: string;
    type: MetadataAttributeType.DATE;
    key?: unknown;
}>;
type NumberAttribute = {
    /**
     * A valid JS number serialized as string. It's consumer responsibility to parse it.
     *
     * @example
     * ```ts
     * '42'
     *
     * '42n'
     *
     * '42.42'
     * ```
     */
    value: string;
    /**
     * Union discriminant.
     */
    type: MetadataAttributeType.NUMBER;
    /**
     * The attribute's unique identifier.
     */
    key: string;
};
/**
 * @internal
 */
declare const NumberAttributeSchema: z.ZodObject<{
    type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
    key: z.ZodType<string, z.ZodTypeDef, unknown>;
    value: z.ZodType<string, z.ZodTypeDef, unknown>;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: MetadataAttributeType.NUMBER;
    key: string;
}, {
    type: MetadataAttributeType.NUMBER;
    key?: unknown;
    value?: unknown;
}>;
type StringAttribute = {
    /**
     * Any string value.
     */
    value: string;
    /**
     * Union discriminant.
     */
    type: MetadataAttributeType.STRING;
    /**
     * The attribute's unique identifier.
     */
    key: string;
};
/**
 * @internal
 */
declare const StringAttributeSchema: z.ZodObject<{
    type: z.ZodLiteral<MetadataAttributeType.STRING>;
    key: z.ZodType<string, z.ZodTypeDef, unknown>;
    value: z.ZodType<string, z.ZodTypeDef, unknown>;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: MetadataAttributeType.STRING;
    key: string;
}, {
    type: MetadataAttributeType.STRING;
    key?: unknown;
    value?: unknown;
}>;
type JSONAttribute = {
    /**
     * A JSON string. It's consumer responsibility to validate and parse it.
     */
    value: string;
    /**
     * Union discriminant.
     */
    type: MetadataAttributeType.JSON;
    /**
     * Union discriminant.
     */
    /**
     * The attribute's unique identifier.
     */
    key: string;
};
/**
 * @internal
 */
declare const JSONAttributeSchema: z.ZodObject<{
    type: z.ZodLiteral<MetadataAttributeType.JSON>;
    key: z.ZodType<string, z.ZodTypeDef, unknown>;
    value: z.ZodType<string, z.ZodTypeDef, unknown>;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: MetadataAttributeType.JSON;
    key: string;
}, {
    type: MetadataAttributeType.JSON;
    key?: unknown;
    value?: unknown;
}>;
/**
 * A DiGi metadata attribute.
 */
type MetadataAttribute = BooleanAttribute | DateAttribute | NumberAttribute | StringAttribute | JSONAttribute;
declare const MetadataAttributeSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
    key: z.ZodType<string, z.ZodTypeDef, unknown>;
    value: z.ZodEnum<["true", "false"]>;
}, "strip", z.ZodTypeAny, {
    value: "true" | "false";
    type: MetadataAttributeType.BOOLEAN;
    key: string;
}, {
    value: "true" | "false";
    type: MetadataAttributeType.BOOLEAN;
    key?: unknown;
}>, z.ZodObject<{
    type: z.ZodLiteral<MetadataAttributeType.DATE>;
    key: z.ZodType<string, z.ZodTypeDef, unknown>;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: MetadataAttributeType.DATE;
    key: string;
}, {
    value: string;
    type: MetadataAttributeType.DATE;
    key?: unknown;
}>, z.ZodObject<{
    type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
    key: z.ZodType<string, z.ZodTypeDef, unknown>;
    value: z.ZodType<string, z.ZodTypeDef, unknown>;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: MetadataAttributeType.NUMBER;
    key: string;
}, {
    type: MetadataAttributeType.NUMBER;
    key?: unknown;
    value?: unknown;
}>, z.ZodObject<{
    type: z.ZodLiteral<MetadataAttributeType.STRING>;
    key: z.ZodType<string, z.ZodTypeDef, unknown>;
    value: z.ZodType<string, z.ZodTypeDef, unknown>;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: MetadataAttributeType.STRING;
    key: string;
}, {
    type: MetadataAttributeType.STRING;
    key?: unknown;
    value?: unknown;
}>, z.ZodObject<{
    type: z.ZodLiteral<MetadataAttributeType.JSON>;
    key: z.ZodType<string, z.ZodTypeDef, unknown>;
    value: z.ZodType<string, z.ZodTypeDef, unknown>;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: MetadataAttributeType.JSON;
    key: string;
}, {
    type: MetadataAttributeType.JSON;
    key?: unknown;
    value?: unknown;
}>]>;

/**
 * The main focus of a publication.
 */
declare enum PublicationMainFocus {
    VIDEO = "VIDEO",
    IMAGE = "IMAGE",
    ARTICLE = "ARTICLE",
    TEXT_ONLY = "TEXT_ONLY",
    AUDIO = "AUDIO",
    LINK = "LINK",
    EMBED = "EMBED",
    CHECKING_IN = "CHECKING_IN",
    EVENT = "EVENT",
    MINT = "MINT",
    TRANSACTION = "TRANSACTION",
    LIVESTREAM = "LIVESTREAM",
    SHORT_VIDEO = "SHORT_VIDEO",
    THREE_D = "3D",
    STORY = "STORY",
    SPACE = "SPACE"
}

declare enum PublicationContentWarning {
    NSFW = "NSFW",
    SENSITIVE = "SENSITIVE",
    SPOILER = "SPOILER"
}
/**
 * Common fields of a DiGi primary publication.
 */
type PublicationMetadataCommon = {
    /**
     * A unique identifier that in storages like IPFS ensures the uniqueness of the metadata URI.
     *
     * Use a UUID if unsure.
     */
    id: string;
    /**
     * The App Id that this publication belongs to.
     */
    appId?: AppId;
    /**
     * Determine if the publication should not be shown in any feed.
     *
     * @defaultValue false
     */
    hideFromFeed?: boolean;
    /**
     * A bag of attributes that can be used to store any kind of metadata that is not currently supported by the standard.
     * Over time, common attributes will be added to the standard and their usage as arbitrary attributes will be discouraged.
     */
    attributes?: MetadataAttribute[];
    /**
     * The locale of the metadata.
     */
    locale: Locale;
    /**
     * The encryption strategy used to encrypt the publication.
     *
     * If not present, the publication is presumed to be unencrypted.
     */
    encryptedWith?: PublicationEncryptionStrategy;
    /**
     * An arbitrary list of tags.
     */
    tags?: Tag[];
    /**
     * Specify a content warning.
     */
    contentWarning?: PublicationContentWarning;
};
/**
 * Ok, ok, don't! It's really not meant to be used outside.
 * Don't have Kenny say you we told you so.
 *
 * @internal
 */
declare function metadataDetailsWith<Augmentation extends {
    mainContentFocus: z.ZodLiteral<PublicationMainFocus> | z.ZodUnion<[z.ZodLiteral<PublicationMainFocus>, ...z.ZodLiteral<PublicationMainFocus>[]]>;
}>(augmentation: Augmentation): z.ZodObject<Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation extends infer T ? { [k in keyof T]: (Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation)[k]; } : never, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation extends infer T_6 ? { [k in keyof T_6]: (Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation)[k]; } : never>, (z.baseObjectOutputType<Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation extends infer T_9 ? { [k in keyof T_9]: (Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation)[k]; } : never> extends infer T_7 extends object ? { [k_2 in keyof T_7]: undefined extends z.baseObjectOutputType<Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation extends infer T_8 ? { [k in keyof T_8]: (Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation)[k]; } : never>[k_2] ? never : k_2; } : never)[keyof Augmentation | Exclude<"attributes", keyof Augmentation> | Exclude<"id", keyof Augmentation> | Exclude<"appId", keyof Augmentation> | Exclude<"hideFromFeed", keyof Augmentation> | Exclude<"locale", keyof Augmentation> | Exclude<"encryptedWith", keyof Augmentation> | Exclude<"tags", keyof Augmentation> | Exclude<"contentWarning", keyof Augmentation>]> extends infer T_1 ? { [k_1 in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation extends infer T_2 ? { [k in keyof T_2]: (Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation)[k]; } : never>, (z.baseObjectOutputType<Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation extends infer T_5 ? { [k in keyof T_5]: (Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation)[k]; } : never> extends infer T_3 extends object ? { [k_2 in keyof T_3]: undefined extends z.baseObjectOutputType<Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation extends infer T_4 ? { [k in keyof T_4]: (Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation)[k]; } : never>[k_2] ? never : k_2; } : never)[keyof Augmentation | Exclude<"attributes", keyof Augmentation> | Exclude<"id", keyof Augmentation> | Exclude<"appId", keyof Augmentation> | Exclude<"hideFromFeed", keyof Augmentation> | Exclude<"locale", keyof Augmentation> | Exclude<"encryptedWith", keyof Augmentation> | Exclude<"tags", keyof Augmentation> | Exclude<"contentWarning", keyof Augmentation>]>[k_1]; } : never, z.baseObjectInputType<Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation extends infer T_12 ? { [k in keyof T_12]: (Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation)[k]; } : never> extends infer T_10 ? { [k_3 in keyof T_10]: z.baseObjectInputType<Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation extends infer T_11 ? { [k in keyof T_11]: (Omit<{
    id: z.ZodType<string, z.ZodTypeDef, unknown>;
    appId: z.ZodOptional<z.ZodType<AppId, z.ZodTypeDef, string>>;
    hideFromFeed: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.BOOLEAN>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodEnum<["true", "false"]>;
    }, "strip", z.ZodTypeAny, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key: string;
    }, {
        value: "true" | "false";
        type: MetadataAttributeType.BOOLEAN;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.DATE>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.DATE;
        key: string;
    }, {
        value: string;
        type: MetadataAttributeType.DATE;
        key?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.NUMBER>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.NUMBER;
        key: string;
    }, {
        type: MetadataAttributeType.NUMBER;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.STRING>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.STRING;
        key: string;
    }, {
        type: MetadataAttributeType.STRING;
        key?: unknown;
        value?: unknown;
    }>, z.ZodObject<{
        type: z.ZodLiteral<MetadataAttributeType.JSON>;
        key: z.ZodType<string, z.ZodTypeDef, unknown>;
        value: z.ZodType<string, z.ZodTypeDef, unknown>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: MetadataAttributeType.JSON;
        key: string;
    }, {
        type: MetadataAttributeType.JSON;
        key?: unknown;
        value?: unknown;
    }>]>, "many">>;
    locale: z.ZodType<Locale, z.ZodTypeDef, unknown>;
    encryptedWith: z.ZodOptional<z.ZodType<LitEncryptionStrategy, z.ZodTypeDef, object>>;
    tags: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodCatch<z.ZodSet<z.ZodType<Tag, z.ZodTypeDef, string>>>, Set<Tag>, unknown>, Tag[], unknown>>;
    contentWarning: z.ZodOptional<z.ZodNativeEnum<typeof PublicationContentWarning>>;
}, keyof Augmentation> & Augmentation)[k]; } : never>[k_3]; } : never>;
/**
 * Ok, ok, don't! It's really not meant to be used outside.
 * Don't have Kenny say you we told you so.
 *
 * @internal
 */
declare function publicationWith<Augmentation extends {
    $schema: z.ZodLiteral<string>;
    digi: ReturnType<typeof metadataDetailsWith>;
}>(augmentation: Augmentation): z.ZodObject<Omit<{
    description: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<Markdown, z.ZodTypeDef, unknown>>>>;
    external_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    name: z.ZodOptional<z.ZodString>;
    attributes: z.ZodCatch<z.ZodOptional<z.ZodArray<z.ZodType<MarketplaceMetadataAttribute, z.ZodTypeDef, object>, "many">>>;
    image: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    animation_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
}, "signature" | keyof Augmentation> & {
    signature: z.ZodOptional<z.ZodType<Signature, z.ZodTypeDef, unknown>>;
} & Augmentation extends infer T ? { [k in keyof T]: (Omit<{
    description: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<Markdown, z.ZodTypeDef, unknown>>>>;
    external_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    name: z.ZodOptional<z.ZodString>;
    attributes: z.ZodCatch<z.ZodOptional<z.ZodArray<z.ZodType<MarketplaceMetadataAttribute, z.ZodTypeDef, object>, "many">>>;
    image: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    animation_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
}, "signature" | keyof Augmentation> & {
    signature: z.ZodOptional<z.ZodType<Signature, z.ZodTypeDef, unknown>>;
} & Augmentation)[k]; } : never, "passthrough", z.ZodTypeAny, z.objectOutputType<Omit<{
    description: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<Markdown, z.ZodTypeDef, unknown>>>>;
    external_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    name: z.ZodOptional<z.ZodString>;
    attributes: z.ZodCatch<z.ZodOptional<z.ZodArray<z.ZodType<MarketplaceMetadataAttribute, z.ZodTypeDef, object>, "many">>>;
    image: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    animation_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
}, "signature" | keyof Augmentation> & {
    signature: z.ZodOptional<z.ZodType<Signature, z.ZodTypeDef, unknown>>;
} & Augmentation extends infer T_1 ? { [k in keyof T_1]: (Omit<{
    description: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<Markdown, z.ZodTypeDef, unknown>>>>;
    external_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    name: z.ZodOptional<z.ZodString>;
    attributes: z.ZodCatch<z.ZodOptional<z.ZodArray<z.ZodType<MarketplaceMetadataAttribute, z.ZodTypeDef, object>, "many">>>;
    image: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    animation_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
}, "signature" | keyof Augmentation> & {
    signature: z.ZodOptional<z.ZodType<Signature, z.ZodTypeDef, unknown>>;
} & Augmentation)[k]; } : never, z.ZodTypeAny, "passthrough">, z.objectInputType<Omit<{
    description: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<Markdown, z.ZodTypeDef, unknown>>>>;
    external_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    name: z.ZodOptional<z.ZodString>;
    attributes: z.ZodCatch<z.ZodOptional<z.ZodArray<z.ZodType<MarketplaceMetadataAttribute, z.ZodTypeDef, object>, "many">>>;
    image: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    animation_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
}, "signature" | keyof Augmentation> & {
    signature: z.ZodOptional<z.ZodType<Signature, z.ZodTypeDef, unknown>>;
} & Augmentation extends infer T_2 ? { [k in keyof T_2]: (Omit<{
    description: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<Markdown, z.ZodTypeDef, unknown>>>>;
    external_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    name: z.ZodOptional<z.ZodString>;
    attributes: z.ZodCatch<z.ZodOptional<z.ZodArray<z.ZodType<MarketplaceMetadataAttribute, z.ZodTypeDef, object>, "many">>>;
    image: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
    animation_url: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodType<URI, z.ZodTypeDef, unknown>>>>;
}, "signature" | keyof Augmentation> & {
    signature: z.ZodOptional<z.ZodType<Signature, z.ZodTypeDef, unknown>>;
} & Augmentation)[k]; } : never, z.ZodTypeAny, "passthrough">>;
/**
 * Ok, ok, don't! It's really not meant to be used outside.
 * Don't have Kenny say you we told you so.
 *
 * @internal
 */
declare function mainContentFocus<T extends PublicationMainFocus>(focus: T): z.ZodLiteral<T>;
declare function mainContentFocus<T extends PublicationMainFocus, O extends PublicationMainFocus>(...focuses: [T, O]): z.ZodUnion<[z.ZodLiteral<T>, z.ZodLiteral<O>]>;
/**
 * @internal
 */
declare function optionalContentSchema(): z.ZodOptional<z.ZodEffects<z.ZodCatch<z.ZodUnion<readonly [z.ZodType<Markdown, z.ZodTypeDef, unknown>, z.ZodEffects<z.ZodString, EncryptedString, string>]>>, EncryptedString | Markdown, unknown>>;

export { toLocale as $, AppId as A, Brand as B, ChainId as C, DistributiveOmit as D, EncryptableURI as E, FollowCondition as F, MarketplaceMetadataAttributeSchema as G, MarketplaceMetadataSchema as H, BooleanAttribute as I, BooleanAttributeSchema as J, DateAttribute as K, DateAttributeSchema as L, MetadataAttribute as M, NetworkAddressDetails as N, OrCondition as O, PublicationMetadataCommon as P, NumberAttribute as Q, NumberAttributeSchema as R, Signature as S, TwoAtLeastArray as T, URI as U, StringAttribute as V, StringAttributeSchema as W, JSONAttribute as X, JSONAttributeSchema as Y, MetadataAttributeSchema as Z, Locale as _, EncryptableString as a, Erc20OwnershipConditionSchema as a$, LocaleSchema as a0, EncryptedStringSchema as a1, encryptable as a2, nonEmpty as a3, nonEmptyStringSchema as a4, encryptableStringSchema as a5, Tag as a6, toTag as a7, TagSchema as a8, toAppId as a9, NetworkAddressSchema as aA, TokenId as aB, toTokenId as aC, TokenIdSchema as aD, Asset as aE, AssetSchema as aF, asset as aG, Amount as aH, AmountSchema as aI, AmountDetails as aJ, amount as aK, ProfileId as aL, toProfileId as aM, ProfileIdSchema as aN, PublicationId as aO, toPublicationId as aP, PublicationIdSchema as aQ, PublicationContentWarning as aR, metadataDetailsWith as aS, publicationWith as aT, mainContentFocus as aU, optionalContentSchema as aV, EncryptionProvider as aW, NftContractType as aX, ConditionType as aY, refineNftOwnershipCondition as aZ, NftOwnershipConditionSchema as a_, AppIdSchema as aa, toSignature as ab, SignatureSchema as ac, toMarkdown as ad, markdown as ae, toUri as af, uriSchema as ag, encryptableUriSchema as ah, GeoURI as ai, GeoURISchema as aj, GeoPoint as ak, GeoPointSchema as al, geoUri as am, geoPoint as an, encryptableGeoUriSchema as ao, PhysicalAddressSchema as ap, DateTime as aq, toDateTime as ar, datetimeSchema as as, encryptableDateTimeSchema as at, EvmAddress as au, toEvmAddress as av, EvmAddressSchema as aw, toChainId as ax, ChainIdSchema as ay, NetworkAddress as az, MetadataAttributeType as b, EoaOwnershipConditionSchema as b0, ProfileOwnershipConditionSchema as b1, FollowConditionSchema as b2, CollectConditionSchema as b3, AdvancedContractConditionSchema as b4, AndConditionSchema as b5, OrConditionSchema as b6, AccessConditionSchema as b7, LitEncryptionKey as b8, toLitEncryptionKey as b9, LitEncryptionKeySchema as ba, EncryptedPaths as bb, LitEncryptionStrategy as bc, LitEncryptionStrategySchema as bd, PublicationEncryptionStrategy as be, PublicationEncryptionStrategySchema as bf, EncryptedString as c, PublicationMainFocus as d, EncryptableMarkdown as e, MarketplaceMetadata as f, Markdown as g, MarketplaceMetadataAttribute as h, EncryptableGeoURI as i, PhysicalAddress as j, EncryptableDateTime as k, ShapeCheck as l, CollectCondition as m, EoaOwnershipCondition as n, ConditionComparisonOperator as o, Erc20OwnershipCondition as p, NftOwnershipCondition as q, ProfileOwnershipCondition as r, AdvancedContractCondition as s, SimpleCondition as t, AndCondition as u, AnyCondition as v, AccessCondition as w, Overwrite as x, Prettify as y, MarketplaceMetadataAttributeDisplayType as z };
