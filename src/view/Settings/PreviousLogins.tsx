import { Spin, Table } from "antd";
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { getAttempts } from "../../handle/AccountHandler";
import history from "../../handle/History";
import toastStyle from "../../handle/toastStyle";

type PreviousLoginAttempt = {
    time: string
    success: boolean
    ip: string
}

export default () => {
    const [data, setData] = useState([] as PreviousLoginAttempt[]);
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const loadAttempts = async () => {
            let response = await getAttempts();

            if (response.status !== 200) {
                history.push("/");
                toast.error(
                    "There was an issue trying to get the login attempts.",
                    toastStyle
                );
                return;
            }

            let attempts = response.data;

            for (let i = 0; attempts.length > i; i++) {
                let obj = attempts[i];

                setData(prev => {
                    return [
                        ...prev,
                        {
                            time: new Date(obj.date).toLocaleString(),
                            success: obj.success,
                            ip: obj.ip,
                        },
                    ];
                });
            }

            setLoaded(true)
        };

        loadAttempts();
    }, []);

    return (
        <>
            <p>
                View previous logins to this account. <br /> If something seems
                suspicious, please email support@shog.dev
            </p>
            <br />

            {loaded && (
                <Table
                    columns={[
                        {
                            title: "Time",
                            dataIndex: "time",
                        },
                        {
                            title: "IP",
                            dataIndex: "ip",
                        },
                        {
                            title: "Success",
                            dataIndex: "success",
                            render: (bool) => (bool ? "Yes" : "No"),
                        },
                    ]}
                    dataSource={data}
                />
            )}
            
            {!loaded && <Spin/>}
        </>
    );
}