import Document, {DocumentContext} from "next/document";
import { ServerStyleSheet } from "styled-components";

// 서버 측에서 styled-component를 렌더링하려면 _document.js를 재정의해야한다.
// _document.tsx 파일은 pages폴더 내부에 존재하는 모든 페이지에 global한 설정값을 줄 수 있는 파일이다.
// _documnet 또한  getStaticProps와 getServerSideProps를 지원하지 않습니다.
export default class MyDocument extends Document {
    static async getInitialProps(ctx : DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }
}