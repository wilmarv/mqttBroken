import { StyleSheet, View } from "react-native";
import EstufaPage from "./estufa";

function HomePage() {

    return (
        <View style={styles.view}>
            <View style={styles.body}>
                <EstufaPage />
            </View>
        </View>
    );
}
export default HomePage;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: "#2855AE" + "EF",
        justifyContent: 'flex-end',
    },
    body: {
        flex: 0.7,
        alignSelf: "stretch",
        backgroundColor: '#fff',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        padding: 8,
        paddingTop: 20
    }
});