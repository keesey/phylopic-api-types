export declare type ErrorType = 'ACCESS_DENIED'
    | 'API_CONFIGURATION_ERROR'
    | 'AUTHORIZER_FAILURE'
    | 'AUTHORIZER_CONFIGURATION_ERROR'
    | 'BAD_REQUEST_PARAMETERS'
    | 'BAD_REQUEST_BODY'
    | 'DEFAULT_4XX'
    | 'DEFAULT_5XX'
    | 'EXPIRED_TOKEN'
    | 'INVALID_SIGNATURE'
    | 'INTEGRATION_FAILURE'
    | 'INTEGRATION_TIMEOUT'
    | 'INVALID_API_KEY'
    | 'MISSING_AUTHENTICATION_TOKEN'
    | 'QUOTA_EXCEEDED'
    | 'REQUEST_TOO_LARGE'
    | 'RESOURCE_NOT_FOUND'
    | 'THROTTLED'
    | 'UNAUTHORIZED'
    | 'UNSUPPORTED_MEDIA_TYPE';
export declare interface Error {
    readonly developer_message: string;
    readonly documentation?: string;
    readonly field?: string;
    readonly type: ErrorType;
    readonly user_message: string;
}
