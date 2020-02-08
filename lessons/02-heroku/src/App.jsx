import React from "react";
import ReactDOM from "react-dom";
import { Welcome } from "./Welcome";
import { ServerInfo } from "./ServerInfo";
import os from "os";

export function fullAppMarkdown() {
    return ReactDOMServer.renderToStaticMarkup(
        (
            <html>
                <body>
                    <Welcome />
                    <ServerInfo platform={os.platform()} arch={os.arch()} />
                </body>
            </html>
        )
    );
}
