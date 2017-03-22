"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var USER = {
    LAST_NAME: "Фамилия",
    FIRST_NAME: "Имя",
    MIDDLE_NAME: "Отчество",
    BIRTHDAY: "Дата рождения",
    EMAIL: "Email",
    PHONE_NUMBER: "Номер телефона",
    PHOTO: "Фотография"
};
exports.TRANSLATION = {
    PAGE_HEADER: "User manager",
    ALT: {
        LOGO: "",
        USER_LIST: {
            EDIT: "Edit user",
            REMOVE: "Remove user"
        }
    },
    MENU: {
        GET_USERS: "Список пользователей",
        ADD_USER: "Добавить пользователя",
        EDIT_USER: "Редактировать пользователя",
        REMOVE_USER: "Удалить пользователя"
    },
    USER_LIST: {
        WAITING: "Загрузка списка пользователей...",
        ERROR: "Не удалось загрузить список пользователей",
        EMPTY: "Список пользователей пуст",
        TABLE_HEAD: {
            LAST_NAME: USER.LAST_NAME,
            FIRST_NAME: USER.FIRST_NAME,
            MIDDLE_NAME: USER.MIDDLE_NAME,
            BIRTHDAY: USER.BIRTHDAY,
            EMAIL: USER.EMAIL,
            PHONE_NUMBER: USER.PHONE_NUMBER,
            PHOTO: USER.PHOTO,
            EDIT: "",
            REMOVE: ""
        }
    },
    USER_ADD: {
        HEADER: "Добавить нового пользователя",
        FORM_MSG: {
            FILL_ALL_FIELDS: "Пожалуйста, заполните все поля",
            PROCESSING: "Идёт обработка запроса...",
            SUCCESS: "Пользователь успешно добавлен",
            FAILED: "Не удалось добавить пользователя"
        },
        FORM: {
            LAST_NAME: USER.LAST_NAME,
            FIRST_NAME: USER.FIRST_NAME,
            MIDDLE_NAME: USER.MIDDLE_NAME,
            BIRTHDAY: USER.BIRTHDAY,
            EMAIL: USER.EMAIL,
            PHONE_NUMBER: USER.PHONE_NUMBER,
            PHOTO: USER.PHOTO,
            SUBMIT: "Отправить"
        }
    },
    PAGE404: {
        ERROR_CODE: "404",
        HEADER: "Страница не найдена",
        BACK_TO_MAIN_PAGE: "Вернуться на главную страницу"
    }
};
