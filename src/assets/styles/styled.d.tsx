import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        main: {
            background : string,
            color: string
        },
        sub: {
            background : string,
            color: string
        }
    }
}