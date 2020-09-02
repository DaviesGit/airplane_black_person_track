var person_property = [
    "name",
    "sex",
    "age",
    "native_place",
    "political_outlook",
    "email",
    "telephone",
    "id_card",
    "address",
    "domicile",
    "is_fugitive",
    "is_crime",
    "comment"
]


let person_data = [{
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
}, {
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
}, {
    "name": "原瑞锦",
    "sex": "女",
    "age": "34",
    "native_place": "藏族",
    "political_outlook": "群众",
    "email": "faith@gmail.com",
    "telephone": "18743536944",
    "id_card": "620302197409157545",
    "address": "四川省成都市成华区金马河路8号",
    "domicile": "甘肃省 金昌市 市辖区 金川区",
    "is_fugitive": "否",
    "is_crime": "是",
    "comment": "身高175左右 体形偏胖"
}, {
    "name": "海燕岚",
    "sex": "女",
    "age": "31",
    "native_place": "壮族",
    "political_outlook": "预备党员",
    "email": "virginia@fox.com",
    "telephone": "13992645836",
    "id_card": "35060019750113896X",
    "address": "四川省成都市龙泉驿区青龙湖湿地公园明蜀王陵",
    "domicile": "吐鲁番地区 塔城地区 额敏县",
    "is_fugitive": "是",
    "is_crime": "否",
    "comment": "脖子很短。身穿墨绿色带帽的风衣，衣服材质近于雨衣。"
}, {
    "name": "盍昌翰",
    "sex": "男",
    "age": "45",
    "native_place": "瑶族",
    "political_outlook": "群众",
    "email": "thrubay@mail.com",
    "telephone": "17974967735",
    "id_card": "654221198209222151",
    "address": "四川省雅安市雨城区正和路1号",
    "domicile": "辽宁省 铁岭市 市辖区 银州区",
    "is_fugitive": "是",
    "is_crime": "是",
    "comment": "平头，脸型大，面带笑容"
}]

$(function() {

    function switch_buttons(type) {
        if ('add' === type) {
            $('#buttons_add_submit').show();
            $('#buttons_edit_submit').hide();
        } else if ('edit' === type) {
            $('#buttons_add_submit').hide();
            $('#buttons_edit_submit').show();
        } else {
            $('#buttons_add_submit').hide();
            $('#buttons_edit_submit').hide();
        }
    }

    function empty_input() {
        person_property.forEach(function(property) {
            $('#' + property).val('');
        });
    }

    $('#all_black_lists>a').on('click', function(event) {
        $('#all_black_lists>ul').empty();
        person_data.forEach(function(ele) {
            $('#all_black_lists>ul').append($('<li><a data-id_card="' + ele.id_card + '" id="black_list_id_' + ele.id_card + '" href="#">' + ele.name + '</a></li>'));
        });
        $('#all_black_lists>ul>li').on('click', function(event) {
            var ele = event.target;
            var id_card = '' + $(ele).data('id_card');
            var black_person = null;
            person_data.forEach(function(ele) {
                if (id_card === ele.id_card) {
                    black_person = ele;
                }
            });
            for (var property in black_person) {
                $('#' + property).val(black_person[property]).prop('readonly', true);
            }
            switch_buttons();
        });
        $.post('../../upload/update_data', {
            type: 'get_all_person'
        }, function(response) {
            if (!response || (response && response.status)) {
                return alert('get_all_person command error!');
            }
            var black_lists = response.all_person;
            black_lists.forEach(function(ele) {
                $('#all_black_lists>ul').append($('<li><a data-id_card="' + ele.id_card + '" id="black_list_id_' + ele.id_card + '" href="#">' + ele.name + '</a></li>'));
            });
            $('#all_black_lists>ul>li').on('click', function(event) {
                var ele = event.target;
                var id_card = '' + $(ele).data('id_card');
                var black_person = null;
                black_lists.forEach(function(ele) {
                    if (id_card === ele.id_card) {
                        black_person = ele;
                    }
                });
                for (var property in black_person) {
                    $('#' + property).val(black_person[property]).prop('readonly', true);
                }
                switch_buttons();
            });
        });
    });

    $('#add_black_lists>a').on('click', function(event) {
        person_property.forEach(function(property) {
            $('#' + property).val('').prop('readonly', false);
        });
        switch_buttons('add');
    });

    $('#edit_black_lists>a').on('click', function(event) {
        $('#edit_black_lists>ul').empty();
        $.post('../../upload/update_data', {
            type: 'get_all_person'
        }, function(response) {
            if (!response || (response && response.status)) {
                return alert('get_all_person command error!');
            }
            var black_lists = response.all_person;

            black_lists.forEach(function(ele) {
                $('#edit_black_lists>ul').append($('<li><a data-id_card="' + ele.id_card + '" id="black_list_id_' + ele.id_card + '" href="#">' + ele.name + '</a></li>'));
            });
            $('#edit_black_lists>ul>li').on('click', function(event) {
                var ele = event.target;
                var id_card = '' + $(ele).data('id_card');
                var black_person = null;
                black_lists.forEach(function(ele) {
                    if (id_card === ele.id_card) {
                        black_person = ele;
                    }
                });
                for (var property in black_person) {
                    $('#' + property).val(black_person[property]).prop('readonly', false);
                    $('#id_card').prop('readonly', true);
                }
                switch_buttons('edit');
            });
        });

    });


    $('#button_add_empty').on('click', function(event) {
        empty_input();
    });

    $('#button_add_submit').on('click', function(event) {
        var person = {};
        person_property.forEach(function(property) {
            person[property] = $('#' + property).val();
        });
        $.post('../../upload/update_data', {
            type: 'add_person',
            person: JSON.stringify(person)
        }, function(response) {
            if (!response || (response && response.status)) {
                return alert('add_person command error!');
            } else {
                alert('添加成功！');
                empty_input()
            }
        });
    });


    $('#button_edit_delete').on('click', function(event) {
        if (!confirm('你确定要删除这个黑名单吗？')) {
            return;
        }
        $.post('../../upload/update_data', {
            type: 'delete_person',
            id_card: $('#id_card').val()
        }, function(response) {
            if (!response || (response && response.status)) {
                return alert('delete_person command error!');
            } else {
                alert('删除成功！');
                $('#edit_black_lists').click();
                empty_input()
            }
        });
    });


    $('#button_edit_submit').on('click', function(event) {
        var person = {};
        person_property.forEach(function(property) {
            person[property] = $('#' + property).val();
        });
        $.post('../../upload/update_data', {
            type: 'edit_person',
            person: JSON.stringify(person)
        }, function(response) {
            if (!response || (response && response.status)) {
                return alert('add_person command error!');
            } else {
                alert('修改成功！');
            }
        });
    });


    $('#all_black_lists>a').click();
});