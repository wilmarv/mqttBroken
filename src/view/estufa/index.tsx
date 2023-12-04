import { StyleSheet, Text, View } from "react-native";
import { ButtonGroup, Divider } from '@rneui/themed';
import { useEffect, useState } from "react";
import { Grid, LineChart, YAxis } from 'react-native-svg-charts';
import ClientMQTT from "~/service/ClientMQTT";

function EstufaPage() {

    const [modeOperacao, setModoOperacao] = useState(-1);
    const [arrayTemp, setArrayTemp] = useState<number[]>([]);
    const [clientMQTT, setClientMQTT] = useState<null | ClientMQTT>(null);
    const [atualtemp, setAtualtemp] = useState<number | null>(null);

    useEffect(() => {
        if (clientMQTT === null) {
            const clientMQTT = new ClientMQTT("sistematemperatura/atual");
            clientMQTT.setMessageArrived((message) => {
                const atualtemp = Number(message.payloadString);
                setAtualtemp(atualtemp);
            });
            setClientMQTT(clientMQTT);
        }
    }, []);

    useEffect(() => {
        if (atualtemp !== null) {
            if (arrayTemp.length > 12) {
                const novaLista = arrayTemp.slice(1);
                setArrayTemp([...novaLista, atualtemp]);
                return;
            }
            setArrayTemp([...arrayTemp, atualtemp]);
        }
    }, [atualtemp]);

    useEffect(() => {
        if (modeOperacao === 0) clientMQTT?.sendMessage("-2", "sistematemperatura/configurada");
        if (modeOperacao === 1) clientMQTT?.sendMessage(`-6`, "sistematemperatura/configurada");
        if (modeOperacao === 2) clientMQTT?.sendMessage(`-8`, "sistematemperatura/configurada");
    }, [modeOperacao]);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SISTEMA DE CONTROLE DE TEMPERATURA</Text>

            <Divider width={1.5} style={{ marginVertical: 10 }} />

            <Text style={styles.label}>Modo de Operação:</Text>
            <ButtonGroup
                buttons={["-2°C", "-6°C", "-8°C"]}
                selectedIndex={modeOperacao}
                onPress={(value) => setModoOperacao(value)}
            />

            <View style={styles.graficoContainer}>
                <YAxis
                    data={arrayTemp}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    formatLabel={(value) => `${value}ºC`}
                    min={-11}
                    max={11}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={arrayTemp}
                    svg={{ stroke: "#2855AE" }}
                    xMax={12}
                    yMax={11}
                    yMin={-11}
                >
                    <Grid />
                </LineChart>
            </View>


        </View>
    );
}
export default EstufaPage;

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
        color: "#777777",
        marginVertical: 5,
        fontSize: 14,
        marginHorizontal: 10
    },
    graficoContainer: {
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 5
    }
});