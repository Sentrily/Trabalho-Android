import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { styles } from './AppStyles';

export default function LoginScreen({ db, onLoginSuccess }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin() {
    if (usuario === 'Betina' && senha === 'Amora11') {
      if (!db) return;
      try {
        await db.runAsync('INSERT INTO auth (isAuthenticated) VALUES (?)', [1]);
        onLoginSuccess();
        Alert.alert('Sucesso', 'Login realizado!');
      } catch (error) {
        Alert.alert('Erro', 'Erro ao salvar login');
      }
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos!');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>APP</Text>
        <Text style={styles.loginSubtitle}>Gerador de PDF E QRCode</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuário:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o usuário"
            placeholderTextColor='lightgray'
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a senha"
            placeholderTextColor='lightgray'
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.loginButton}>
          <Button title="Entrar" onPress={handleLogin} />
        </View>

        
      </View>
    </View>
  );
}