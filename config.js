module.exports = {
    server_port : 8989,

    //! rules
    [
        {
            url_type : 'string',
            url : '127.0.0.1/test/test.action',
            source_id : 1,

            sources : [
                {
                    type : 'host',
                    content : '192.168.50.172:8090'
                },
                {
                    type : 'json',
                    content : '{"code":"0"}'
                },
                {
                    type : 'url',
                    content : '127.0.0.1/test/a.json'
                }
            ]
        },

        {
            url_type : 'regexp',
            url : 's1.mljr.com/cms',
            source_id : 0,

            source_id : [
                {
                    type : 'host',
                    content : '221.194.184.235:443'
                }
            ]
        },

        {
            url_type : 'regexp',
            url : 's1.mljr.com',
            source_id : 0,

            source_id : [
                {
                    type : 'host',
                    content : '192.168.50.107'
                }
            ]
        }
    ]
}