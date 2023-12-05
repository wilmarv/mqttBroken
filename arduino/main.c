#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Servo.h>


const char* ssid = "NOME_DA_REDE_WIFI";
const char* password = "SENHA_DA_REDE_WIFI";

const char* mqtt_server = "hivemq.cloud";
const int mqtt_port = 8883;

WiFiClient espClient;
PubSubClient client(espClient);
Servo porta;

void setup() {
  Serial.begin(115200);
  
  // conexão wifi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }
  Serial.println("Conectado ao WiFi");

  // Configura o servidor MQTT
  client.setServer(mqtt_server, mqtt_port);

  // Conecta ao servidor MQTT
  while (!client.connected()) {
    Serial.println("Conectando ao servidor MQTT...");
    if (client.connect("ESP8266Client")) {
      Serial.println("Conectado ao servidor MQTT");
 
      client.subscribe("topico");
      
    } else {
      Serial.print("Falha na conexão ao servidor MQTT, rc=");
      Serial.print(client.state());
      Serial.println(" Tentando novamente em 5 segundos...");
      delay(5000);
    }
  }
  
  pinMode(7, OUTPUT); //PORTA FECHADA
  pinMode(6, OUTPUT); //PORTA ABERTA
  porta.attach(5);
}

void loop() {
  // Mantém a conexão MQTT
  if (!client.connected()) {
    reconectarMQTT();
  }

  // Verifica se há mensagens MQTT
  client.loop();

  //lógica do micro servo funcionando junto do led
  if ("porta aberta == false") {
  	digitalWrite(7, HIGH);
    digitalWrite(6, LOW);
  	porta.write(90);
  	delay(2000);
  }	else {
    digitalWrite(6, HIGH);
    digitalWrite(7, LOW);
  	porta.write(0);
  	delay(2000);
  }

}

void reconectarMQTT() {
  // Reconecta ao servidor MQTT
  while (!client.connected()) {
    Serial.println("Conectando ao servidor MQTT...");
    if (client.connect("ESP8266Client")) {
      Serial.println("Conectado ao servidor MQTT");
      
      client.subscribe("topico");
      
    } else {
      Serial.print("Falha na conexão ao servidor MQTT, rc=");
      Serial.print(client.state());
      Serial.println(" Tentando novamente em 5 segundos...");
      delay(5000);
    }
  }
}
