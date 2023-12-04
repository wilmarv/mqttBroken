import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import ClientMQTT from "~/service/ClientMQTT";
import { Divider, Icon } from '@rneui/themed';
import * as LocalAuthentication from 'expo-local-authentication';


function FechaduraPage() {

    const [statusPorta, setStatusPorta] = useState(0);
    const [clientMQTT, setClientMQTT] = useState<null | ClientMQTT>(null);

    const [authResult, setAuthResult] = useState<string | null>(null);

    useEffect(() => {
        if (clientMQTT === null) {
            const clientMQTT = new ClientMQTT("sistemafechadura/casaWilmar");
            clientMQTT.setMessageArrived((message) => {
                setStatusPorta(Number(message.payloadString));
            });
            setClientMQTT(clientMQTT);
        }
    }, []);

    const handleAuthentication = async () => {
        try {
            const isSupported = await LocalAuthentication.hasHardwareAsync();

            if (isSupported) {
                const authResult = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Identifique-se para destravar a porta',
                });

                if (authResult.success) {
                    if (statusPorta === 0) {
                        setStatusPorta(1);
                        clientMQTT?.sendMessage(`${1}`)
                    }
                }
            }
        } catch (error) {
            console.error('Erro durante a autenticação:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{"SISTEMA DE CONTROLE \n DE FECHADURA"}</Text>
            <Divider width={1.5} style={{ marginVertical: 10 }} />

            {
                statusPorta === 0 &&
                <Pressable onPress={handleAuthentication}>
                    <View style={styles.card}>
                        <Icon
                            name={'shield-lock-open-outline'}
                            type='material-community'
                            size={50}
                        />
                        <Text style={styles.label}>{"Abrir Porta"}</Text>
                    </View>
                </Pressable>
            }

            {
                statusPorta === 1 &&
                <View style={styles.alertaContainer}>
                    <Icon
                        name={'door-open'}
                        type='font-awesome-5'
                        size={50}
                        style={{ margin: 15 }}
                    />

                    <Text style={styles.title}>{"A PORTA ESTA ABERTA"}</Text>
                </View>
            }


        </View>
    );
}
export default FechaduraPage;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        textAlign: "center",
        color: "#3A3A3A",
        fontSize: 19
    },
    label: {
        fontSize: 18,
        alignSelf: "stretch",
        textAlign: "center",
        marginTop: 5
    },
    card: {
        width: 150,
        alignItems: "center",
        justifyContent: "space-evenly",
        elevation: 5,
        borderRadius: 20,
        paddingVertical: 20
    },
    alertaContainer: {
        flex: 1,
        justifyContent: "center"
    }
});