import { PreTaskQuestion } from "../interfaces/PreTaskQuestion.interface"
import { PreTaskTypeQuestion } from "../enums/PreTaskTypeQuestion.enum"

export const PRETASK: PreTaskQuestion[][] = [
    [
        {
            id: 1,
            content: "Manzana",
            type: PreTaskTypeQuestion.MULTIPLE_CHOICE,
            imgAlt: "Manzana",
            imgUrl: "https://images.unsplash.com/photo-1611574474484-ced6cb70a2cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            options: [
                {
                    id: 1,
                    content: "Apple",
                    correct: true,
                    feedback: "Correct! 'Manzana' translates to 'apple' in english.",
                },
                {
                    id: 2,
                    content: "Orange",
                    correct: false,
                    feedback: "Incorrect. 'Orange' translates to 'naranja' in Spanish.",
                },
                {
                    id: 3,
                    content: "Pineapple",
                    correct: false,
                    feedback: "Incorrect. 'Pineapple' translates to 'piña' in Spanish.",
                },
            ],
        },
        {
            id: 2,
            content: "",
            type: PreTaskTypeQuestion.FLASHCARD,
            imgAlt: "cat",
            imgUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80",
            options: [
                {
                    id: 1,
                    content: "gato",
                    correct: true,
                    feedback: "Correct! 'Cat' translates to 'gato' in Spanish.",
                },
                {
                    id: 2,
                    content: "perro",
                    correct: false,
                    feedback: "Incorrect. 'Perro' translates to 'dog' in English.",
                },
                {
                    id: 3,
                    content: "conejo",
                    correct: false,
                    feedback: "Incorrect. 'Conejo' translates to 'rabbit' in English.",
                },
            ],
        },
        {
            id: 3,
            content: "How are you?",
            type: PreTaskTypeQuestion.ORDER,
            imgAlt: "",
            imgUrl: "",
            options: [
                {
                    id: 1,
                    content: "I am good",
                    correct: true,
                    feedback: "",
                },
                {
                    id: 2,
                    content: "_",
                    correct: false,
                    feedback: "",
                },
                {
                    id: 3,
                    content: "_",
                    correct: false,
                    feedback: "",
                },
                {
                    id: 4,
                    content: "_",
                    correct: false,
                    feedback: "",
                },
            ],
        },
        {
            id: 4,
            content: "I am a _.",
            type: PreTaskTypeQuestion.FIll_BLANK,
            imgAlt: "profesor",
            imgUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            options: [
                {
                    id: 1,
                    content: "teacher",
                    correct: true,
                    feedback: "Correct! The missing word is 'teacher'.",
                },
                {
                    id: 2,
                    content: "years",
                    correct: false,
                    feedback: "Incorrect. The missing word is 'teacher'.",
                },
                {
                    id: 3,
                    content: "my",
                    correct: false,
                    feedback: "Incorrect. The missing word is 'teacher'.",
                }
            ],
        },
        {
            id: 5,
            content: "Manglar",
            type: PreTaskTypeQuestion.FLASHCARD,
            imgAlt: "Manglar",
            imgUrl: "https://images.unsplash.com/photo-1589556183130-530470785fab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            options: [
                {
                    id: 1,
                    content: "Mangrove",
                    correct: true,
                    feedback: "Correct!",
                },
                {
                    id: 2,
                    content: "Beach",
                    correct: false,
                    feedback: "Incorrect.",
                },
                {
                    id: 3,
                    content: "Hotel",
                    correct: false,
                    feedback: "Incorrect.",
                },
            ],
        },
        {
            id: 6,
            content: "Dog",
            type: PreTaskTypeQuestion.MULTIPLE_CHOICE,
            imgAlt: "dog",
            imgUrl: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            options: [
                {
                    id: 1,
                    content: "perro",
                    correct: true,
                    feedback: "Correct! 'Dog' translates to 'perro' in Spanish.",
                },
                {
                    id: 2,
                    content: "gato",
                    correct: false,
                    feedback: "Incorrect. 'Gato' translates to 'cat' in English.",
                },
                {
                    id: 3,
                    content: "pájaro",
                    correct: false,
                    feedback: "Incorrect. 'Pájaro' translates to 'bird' in English.",
                },
            ],
        },
        {
            id: 7,
            content: "Carro",
            type: PreTaskTypeQuestion.FLASHCARD,
            imgAlt: "Carro",
            imgUrl: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80",
            options: [
                {
                    id: 1,
                    content: "car",
                    correct: true,
                    feedback: "Correct! 'Car' translates to 'coche' in Spanish.",
                },
                {
                    id: 2,
                    content: "cat",
                    correct: false,
                    feedback: "Incorrect. 'Gato' translates to 'cat' in English.",
                },
                {
                    id: 3,
                    content: "bird",
                    correct: false,
                    feedback: "Incorrect. 'Pájaro' translates to 'bird' in English.",
                }
            ],
        },
        {
            id: 8,
            content: "Hello. _ name is John.",
            type: PreTaskTypeQuestion.FIll_BLANK,
            imgAlt: "estudiante",
            imgUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            options: [
                {
                    id: 1,
                    content: "My",
                    correct: true,
                    feedback: "",
                },
                {
                    id: 2,
                    content: "I",
                    correct: false,
                    feedback: "",
                },
                {
                    id: 3,
                    content: "You",
                    correct: false,
                    feedback: "",
                },
            ],
        },
        {
            id: 9,
            content: "What is this?",
            type: PreTaskTypeQuestion.ORDER,
            imgAlt: "",
            imgUrl: "",
            options: [
                {
                    id: 1,
                    content: "This is a book",
                    correct: true,
                    feedback: "",
                },
                {
                    id: 2,
                    content: "_",
                    correct: false,
                    feedback: "",
                },
                {
                    id: 3,
                    content: "_",
                    correct: false,
                    feedback: "",
                }
            ],
        },
        {
            id: 10,
            content: "Is it a computer?",
            type: PreTaskTypeQuestion.FLASHCARD,
            imgAlt: "Is this a computer?",
            imgUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            options: [
                {
                    id: 1,
                    content: "Yes, it is",
                    correct: true,
                    feedback: "",
                },
                {
                    id: 2,
                    content: "No, it are",
                    correct: false,
                    feedback: "",
                },
                {
                    id: 3,
                    content: "Yes, it are",
                    correct: false,
                    feedback: "",
                },
            ],
        },
    ]
];