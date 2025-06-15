import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { styles } from './AppStyles';

export default function QRCodeGenerator({ db }) {
  const [urlSite, setUrlSite] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const qrCodeRef = useRef(null);
  
  // Link Instagram
  const instagramLink = 'https://www.instagram.com/amoraprettybags/';

  function isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  function generateInstagramQR() {
    setQrCodeValue(instagramLink);
    setShowQRCode(true);
    setUrlSite(instagramLink);

    if (db) {
      db.runAsync('INSERT INTO qrcodes (url, titulo) VALUES (?, ?)', [
        instagramLink,
        `QR Code Instagram - ${new Date().toLocaleDateString('pt-BR')}`
      ]);
    }

    Alert.alert('Sucesso', 'QR Code do Instagram gerado!');
  }

  function generateQRCode() {
    if (!urlSite.trim()) {
      Alert.alert('Aviso', 'Digite uma URL');
      return;
    }

    let url = urlSite.trim();
    
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    if (!isValidURL(url)) {
      Alert.alert('Erro', 'URL inválida');
      return;
    }

    setQrCodeValue(url);
    setShowQRCode(true);

    if (db) {
      db.runAsync('INSERT INTO qrcodes (url, titulo) VALUES (?, ?)', [
        url,
        `QR Code - ${new Date().toLocaleDateString('pt-BR')}`
      ]);
    }

    Alert.alert('Sucesso', 'QR Code gerado!');
  }


  async function shareQRCodeImage() {
    if (!qrCodeValue) {
      Alert.alert('Aviso', 'Gere um QR Code primeiro');
      return;
    }

    try {
      if (qrCodeRef.current) {
        qrCodeRef.current.toDataURL((dataURL) => {
          if (dataURL) {
            // Salva a imagem temporariamente
            const filename = `qrcode_${Date.now()}.png`;
            const fileUri = FileSystem.documentDirectory + filename;
            
            const base64Data = dataURL.replace(/^data:image\/png;base64,/, '');
            
            FileSystem.writeAsStringAsync(fileUri, base64Data, {
              encoding: FileSystem.EncodingType.Base64,
            }).then(() => {
              Sharing.shareAsync(fileUri, {
                mimeType: 'image/png',
                dialogTitle: 'Compartilhar QR Code'
              });
            }).catch((error) => {
              console.error('Erro ao salvar imagem:', error);
              Alert.alert('Erro', 'Não foi possível salvar a imagem');
            });
          }
        });
      }
    } catch (error) {
      console.error('Erro ao compartilhar imagem:', error);
      Alert.alert('Erro', 'Não foi possível compartilhar a imagem');
    }
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Gerar QR Code</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>URL do Site:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: google.com"
          placeholderTextColor='lightgray'
          value={urlSite}
          onChangeText={setUrlSite}
          autoCapitalize="none"
          keyboardType="url"
        />
      </View>

      <Button title="Gerar QR Code" onPress={generateQRCode} />

      <View style={styles.generateButton}>
        <Button 
          title="QR Code Instagram @amoraprettybags" 
          onPress={generateInstagramQR} 
          color="#E4405F"
        />
      </View>

      {showQRCode && qrCodeValue && (
        <View style={styles.qrCodeContainer}>
          <Text style={styles.qrCodeTitle}>QR Code Gerado:</Text>
          <Text style={styles.qrCodeUrl}>{qrCodeValue}</Text>
          
          <View style={styles.qrCodeWrapper}>
            <QRCode
              value={qrCodeValue}
              size={180}
              color="black"
              backgroundColor="white"
              getRef={qrCodeRef}
            />
          </View>

          <View style={styles.qrCodeActions}>
            <Button
              title="Imagem"
              onPress={shareQRCodeImage}
              color="#007aff"
            />
            <Button
              title="Link"
              onPress={() => Sharing.shareAsync(qrCodeValue, {
                dialogTitle: 'Compartilhar Link'
              })}
              color="#34c759"
            />
            <Button
              title="Novo"
              onPress={() => {
                setShowQRCode(false);
                setQrCodeValue('');
                setUrlSite('');
              }}
              color="#ff3b30"
            />
          </View>
        </View>
      )}

    </View>
  );
}
