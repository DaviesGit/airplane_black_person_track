$.post('../../upload/update_data', {
    type: 'add_person',
    person: JSON.stringify(black_lists[1])
}, function (response) { console.log(response) });

$.post('../../upload/update_data', {
    type: 'get_all_person'
}, function (response) { console.log(response) });

$.post('../../upload/update_data', {
    type: 'get_person',
    id_card: '34010219900307269X'
}, function (response) { console.log(response) });

$.post('../../upload/update_data', {
    type: 'delete_person',
    id_card: '34010219900307269X'
}, function (response) { console.log(response) });


$.post('../../upload/update_data', {
    type: 'edit_person',
    person: JSON.stringify(temp1)
}, function (response) { console.log(response) });




a.forEach(function (ele) {
    $.post('../../upload/update_data', {
        type: 'add_person',
        person: JSON.stringify(ele)
    }, function (response) { console.log(response) });
})
