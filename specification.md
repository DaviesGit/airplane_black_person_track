
绑定个一个端口接收HTTP请求
要支持POST & GET request

主要实现两个功能：
1.黑名单操作。
    |-添加黑名单
    |-删除黑名单
    |-编辑黑名单 （=删除黑名单&添加黑名单）
    |-获取黑名单 （通过id_card=身份证号）
    |-获取所有黑名单 （支持分页 指定items/page）

2.获取某个人的位置信息。
    |-获取当前位置 （位置存入时间=更新时间）
    |-获取历史位置 （通过某个时间段来获取=判断每个位置的存入时间）

所有的请求都是post到一个路径，需要的操作通过 post请求 的 json数组 中的command来判断，超大的switch


/*
*********************************************************************************************************************************************************
**添加黑名单： 
*/
HTTP post 请求，post内容(json)：
{
    "command": "add_black_person",
    "data": {
        "name": "雷烨霖",
        "sex": "男",
        "age": "42",
        "native_place": "汉族",
        "political_outlook": "群众",
        "email": "adf@msn.com",
        "telephone": "15178563457",
        "id_card": "34010219900307269X",
        "address": "四川省德阳市绵竹市苏绵大道中段26号",
        "domicile": "四川省南充市嘉陵区",
        "is_fugitive": "是",
        "is_crime": "是",
        "comment": "寸头，身穿黑色大褂"
    }
}
返回内容(json)：
{
    "status": 0,  //an integer indicate the return status. (0 indicate successful, others indicate error)
    "error": "this is error info!",   //optional, if status is not 0 ,the error property is required.
}




/*
*********************************************************************************************************************************************************
**删除黑名单： 
*/
HTTP post 请求，post内容(json)：
{
    "command": "delete_black_person",
    "data": {
        "id_card": "34010219900307269X"
    }
}
返回内容(json)：
{
    "status": 0,  //an integer indicate the return status. (0 indicate successful, others indicate error)
    "error": "this is error info!",   //optional, if status is not 0 ,the error property is required.
}




/*
*********************************************************************************************************************************************************
**编辑黑名单： 
*/
通过 data 中的 id_card 来判断更新的是哪一条黑名单信息。 （先删除 id_card 对应的那一条记录 然后再添加这条记录） 或者直接通过 SQL UPDATE 命令。
HTTP post 请求，post内容(json)：
{
    "command": "update_black_person",
    "data": {
        "name": "雷烨霖",
        "sex": "男",
        "age": "42",
        "native_place": "汉族",
        "political_outlook": "群众",
        "email": "adf@msn.com",
        "telephone": "15178563457",
        "id_card": "34010219900307269X",
        "address": "四川省德阳市绵竹市苏绵大道中段26号",
        "domicile": "四川省南充市嘉陵区",
        "is_fugitive": "是",
        "is_crime": "是",
        "comment": "寸头，身穿黑色大褂"
    }
}
返回内容(json)：
{
    "status": 0,  //an integer indicate the return status. (0 indicate successful, others indicate error)
    "error": "this is error info!",   //optional, if status is not 0 ,the error property is required.
}


/*
*********************************************************************************************************************************************************
**获取黑名单： 
*/
HTTP post 请求，post内容(json)：
{
    "command": "get_black_person",
    "data": {
        "id_card": "34010219900307269X"
    }
}
返回内容(json)：
{
    "status": 0,  //an integer indicate the return status. (0 indicate successful, others indicate error)
    "error": "this is error info!",   //optional, if status is not 0 ,the error property is required.
    "data": {   // optional, if status is 0 (successful), the data property is required.
        "name": "雷烨霖",
        "sex": "男",
        "age": "42",
        "native_place": "汉族",
        "political_outlook": "群众",
        "email": "adf@msn.com",
        "telephone": "15178563457",
        "id_card": "34010219900307269X",
        "address": "四川省德阳市绵竹市苏绵大道中段26号",
        "domicile": "四川省南充市嘉陵区",
        "is_fugitive": "是",
        "is_crime": "是",
        "comment": "寸头，身穿黑色大褂"
    }
}




/*
*********************************************************************************************************************************************************
**获取所有黑名单： 
*/
HTTP post 请求，post内容(json)：
{
    "command": "get_black_persons", //这里是复数，区别get_black_person
    "data": {
        "page":1, //start at 1, if it is out off bound, return status 1 (indicates out off bound).
        "items_per_page":10,
    }
}
返回内容(json)：
{
    "status": 0,  //an integer indicate the return status. (0 indicate successful, others indicate error)
    "error": "this is error info!",   //optional, if status is not 0 ,the error property is required.
    "data": [     // optional, if status is 0 (successful), the data property is required.
        {
            "name": "雷烨霖",
            "sex": "男",
            "age": "42",
            "native_place": "汉族",
            "political_outlook": "群众",
            "email": "adf@msn.com",
            "telephone": "15178563457",
            "id_card": "34010219900307269X",
            "address": "四川省德阳市绵竹市苏绵大道中段26号",
            "domicile": "四川省南充市嘉陵区",
            "is_fugitive": "是",
            "is_crime": "是",
            "comment": "寸头，身穿黑色大褂"
        },
        {
            "name": "胡雨泽",
            "sex": "女",
            "age": "36",
            "native_place": "汉族",
            "political_outlook": "党员",
            "email": "645653453@qq.com",
            "telephone": "13197456345",
            "id_card": "110101199003077977",
            "address": "重庆市渝北区洪湖东路1号",
            "domicile": "四川省南充市高坪区",
            "is_fugitive": "否",
            "is_crime": "是",
            "comment": "长发，体型瘦小"
        }
    ]
}




/*
*********************************************************************************************************************************************************
**获取当前位置： 
*/
HTTP post 请求，post内容(json)：
{
    "command": "get_people_current_location",
    "data": {
        "id_card": "34010219900307269X"
    }
}
返回内容(json)：
{
    "status": 0,  //an integer indicate the return status. (0 indicate successful, others indicate error)
    "error": "this is error info!",   //optional, if status is not 0 ,the error property is required.
    "data": {     // optional, if status is 0 (successful), the data property is required.
        "location": {
            "x":10.146246,
            "y":3.236674
        },
        "recorded_time": 1547264430987
    }
}





/*
*********************************************************************************************************************************************************
**获取历史位置： 
*/
HTTP post 请求，post内容(json)：
{
    "command": "get_people_history_location",
    "data": {
        "id_card": "34010219900307269X",
        "start_timestamp": 1547264430987,
        "end_timestamp": 1547265350732
    }
}
返回内容(json)：
{
    "status": 0,  //an integer indicate the return status. (0 indicate successful, others indicate error)
    "error": "this is error info!",   //optional, if status is not 0 ,the error property is required.
    "data": [     // optional, if status is 0 (successful), the data property is required.
        {
            "location": {
                "x":10.146246,
                "y":3.236674
            },
            "recorded_time": 1547264430987
        },
        {
            "location": {
                "x":10.235454,
                "y":3.398734
            },
            "recorded_time": 1547264431836
        },
        {
            "location": {
                "x":10.146246,
                "y":3.2366743
            },
            "recorded_time": 1547264432934
        }
    ]
}




