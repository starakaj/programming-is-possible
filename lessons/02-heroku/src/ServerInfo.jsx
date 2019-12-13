import React from "react";

export const ServerInfo = (props) => {
    const {
        platform,
        arch
    } = props;
    return <div>
        This page is server from a {platform} machine on a {arch} architecture
    </div>
}