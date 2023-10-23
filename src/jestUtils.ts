import { DefaultBodyType, Path, PathParams, ResponseResolver, http } from 'msw'
import { setupServer } from 'msw/node'
import { HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler'

export interface ServerEndoint {
    readonly url: Path
    readonly response: ResponseResolver<
        HttpRequestResolverExtras<PathParams>,
        DefaultBodyType,
        undefined
    >
    readonly verb: keyof typeof http
}
export function buildServer(endpoints: ServerEndoint[]) {
    return setupServer(
        ...endpoints.map((endpoint) =>
            http[endpoint.verb](endpoint.url, endpoint.response),
        ),
    )
}

export function buildMockGet(): ServerEndoint {
    return {
        url: '/test',
        verb: 'get',
        response: async () => {
            return new Response(
                JSON.stringify('{ body: "OK" }'),
                {
                    status: 201,
                },
            )
        },
    }
}
