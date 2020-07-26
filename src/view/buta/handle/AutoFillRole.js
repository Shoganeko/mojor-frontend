import React, { useState } from "react";
import { AutoComplete, Button } from "antd";

export default function AutoFillRole(props) {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);

    const onSearch = (searchText) => {
        let search = [];

        for (let i = 0; props.roles.length > i; i++) {
            let role = props.roles[i];

            if (role.name.toLowerCase().includes(searchText.toLowerCase()))
                search.push({
                    value: role.name,
                });
        }

        setOptions(
            !searchText
                ? props.roles.map((role) => {
                      return {
                          value: role.name,
                      };
                  })
                : search
        );
    };

    const onChange = (value) => {
        setValue(value);
    };

    return (
        <div className="buta-role-set">
            <AutoComplete
                options={options}
                style={{
                    width: 200,
                }}
                onSearch={onSearch}
                onChange={onChange}
                placeholder="Join role name"
            />
            <Button onClick={() => props.onFinish(value)}>Update</Button>
        </div>
    );
}
