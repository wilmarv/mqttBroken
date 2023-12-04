import Paho from "paho-mqtt";

class ClientMQTT {
    private host: string = "8162c6a8da9c42a9a95d81418d2a51ea.s1.eu.hivemq.cloud";
    private port: number = 8884;
    private username: string = "wilmar";
    private password: string = "Mosquittopass1";

    private client: null | any = null;

    constructor(subscribe: string) {
        if (this.client === null) {
            this.client = new Paho.Client(this.host, this.port, 'appSistema');
            this.client.connect({
                onSuccess: () => {
                    console.log('connected');
                    this.client.subscribe(subscribe, {
                        qos: 0,
                        timeout: 500,
                        onSuccess: () => {
                            console.log(`subscribe ${subscribe}/ success`);
                        },
                        onFailure: (error: any) => {
                            console.log("subscribe: ", error)
                        },
                    });
                },
                onFailure: (error: any) => {
                    console.log(error)
                },
                userName: this.username,
                password: this.password,
                useSSL: true,
            });

        }
    }

    setMessageArrived(voidCallBack: (message: Message) => void) {
        this.client.onMessageArrived = voidCallBack;
    }

}
export default ClientMQTT;

interface Message {
    destinationName: string,
    payloadString: string
}