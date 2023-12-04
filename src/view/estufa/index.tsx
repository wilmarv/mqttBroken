import { StyleSheet, Text, View } from "react-native";
import { ButtonGroup, Divider } from '@rneui/themed';
import { useEffect, useState } from "react";
import { Grid, LineChart, YAxis } from 'react-native-svg-charts';
import ClientMQTT from "~/service/ClientMQTT";

const data = [-10, -8, -5, -3, -2, 0, 1, 2];

function EstufaPage() {

    const [modeOperacao, setModoOperacao] = useState(-1);

    useEffect(() => {
        const clientMQTT = new ClientMQTT("sistematemperatura");
        

    }, []);

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
                    data={data}
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
                    data={data}
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