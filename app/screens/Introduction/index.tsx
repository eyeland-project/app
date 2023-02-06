import { View, Text } from 'react-native'
import React from 'react'
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';

import { Introduction as IntroductionInterface } from '../../shared/interfaces/Introduction.interface';

interface TaskParams {
    idTask: string;
}

interface Props {
    route: RouteProp<ParamListBase, 'Introduction'> & {
        params: TaskParams;
    };
}

const INTRODUCTION: IntroductionInterface = {
    idTask: 1,
    name: "Introducción",
    description: "En esta sección se explicará el funcionamiento de la aplicación y se mostrarán los pasos a seguir para realizar la tarea.",
    thumbnail: "https://images.unsplash.com/photo-1601296200639-89349ce76a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    taskOrder: 1,
    keywords: ["Introducción", "Funcionamiento", "Pasos"],
    longDescription: "En esta sección se explicará el funcionamiento de la aplicación y se mostrarán los pasos a seguir para realizar la tarea.",
}


const Introduction = ({ route }: Props) => {
    const { idTask } = route.params;

    return (
        <View>
            <Text>{idTask}</Text>
        </View>
    )
}

export default Introduction