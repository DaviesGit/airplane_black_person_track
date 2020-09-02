from dashboard.models import BlackPerson


def add_person(person):
    black_person_db = BlackPerson(
        name=person['name'],
        sex=person['sex'],
        age=person['age'],
        native_place=person['native_place'],
        political_outlook=person['political_outlook'],
        email=person['email'],
        telephone=person['telephone'],
        id_card=person['id_card'],
        address=person['address'],
        domicile=person['domicile'],
        is_fugitive=person['is_fugitive'],
        is_crime=person['is_crime'],
        comment=person['comment'],
    )
    black_person_db.save()
    return {
        'status': 0,
    }


def delete_person(id_card):
    BlackPerson.objects.filter(id_card=id_card).delete()
    return {
        'status': 0,
    }


def edit_person(person):
    delete_person(person['id_card'])
    return add_person(person)


def get_person(id_card):
    _person = BlackPerson.objects.get(id_card=id_card)
    person = dict()
    person['name'] = _person.name
    person['sex'] = _person.sex
    person['age'] = _person.age
    person['native_place'] = _person.native_place
    person['political_outlook'] = _person.political_outlook
    person['email'] = _person.email
    person['telephone'] = _person.telephone
    person['id_card'] = _person.id_card
    person['address'] = _person.address
    person['domicile'] = _person.domicile
    person['is_fugitive'] = _person.is_fugitive
    person['is_crime'] = _person.is_crime
    person['comment'] = _person.comment
    return {
        'status': 0,
        'person': person,
    }


def get_all_person():
    query_set = BlackPerson.objects.all()
    result = []
    for _person in query_set:
        person = dict()
        person['name'] = _person.name
        person['sex'] = _person.sex
        person['age'] = _person.age
        person['native_place'] = _person.native_place
        person['political_outlook'] = _person.political_outlook
        person['email'] = _person.email
        person['telephone'] = _person.telephone
        person['id_card'] = _person.id_card
        person['address'] = _person.address
        person['domicile'] = _person.domicile
        person['is_fugitive'] = _person.is_fugitive
        person['is_crime'] = _person.is_crime
        person['comment'] = _person.comment
        result.append(person)
    return {
        'status': 0,
        'all_person': result,
    }
