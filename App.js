import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import LoginScreen from './components/LoginScreen';
import PDFGenerator from './components/PDFGenerator';
import QRCodeGenerator from './components/QRCodeGenerator';
import { styles } from './components/AppStyles';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [db, setDb] = useState(null);
  const [savedDocuments, setSavedDocuments] = useState([]);
  

  useEffect(() => {
    initDatabase();
  }, []);

  async function initDatabase() {
    try {
      const database = await SQLite.openDatabaseAsync('pdfapp.db');
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS auth (id INTEGER PRIMARY KEY, isAuthenticated INTEGER DEFAULT 0);
        CREATE TABLE IF NOT EXISTS documents (id INTEGER PRIMARY KEY, titulo TEXT, autor TEXT, data TEXT, uri TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS qrcodes (id INTEGER PRIMARY KEY, url TEXT, titulo TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
      `);
      setDb(database);
      checkAuthStatus(database);
    } catch (error) {
      console.log('Erro DB:', error);
      setIsLoading(false);
    }
  }

  async function checkAuthStatus(database = db) {
    if (!database) return;
    try {
      const result = await database.getAllAsync('SELECT isAuthenticated FROM auth ORDER BY id DESC LIMIT 1');
      if (result.length > 0 && result[0].isAuthenticated === 1) {
        setIsAuthenticated(true);
        loadSavedDocuments(database);
      }
    } catch (error) {
      console.log('Erro auth:', error);
    }
    setIsLoading(false);
  }

  async function loadSavedDocuments(database = db) {
    if (!database) return;
    try {
      const docs = await database.getAllAsync('SELECT * FROM documents ORDER BY created_at DESC');
      setSavedDocuments(docs);
    } catch (error) {
      console.log('Erro docs:', error);
    }
  }

  function handleLoginSuccess() {
    setIsAuthenticated(true);
    loadSavedDocuments();
  }

  async function handleLogout() {
    if (!db) return;
    try {
      await db.runAsync('DELETE FROM auth');
      setIsAuthenticated(false);
      setSavedDocuments([]);
      Alert.alert('Sucesso', 'Logout realizado');
    } catch (error) {
      Alert.alert('Erro', 'Erro no logout');
    }
  }

  async function removeDocument(docId) {
    Alert.alert('Confirmação', 'Remover documento?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          if (db) {
            await db.runAsync('DELETE FROM documents WHERE id = ?', [docId]);
            loadSavedDocuments();
          }
        },
      },
    ]);
  }

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen db={db} onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>PDF & QR Code</Text>
        <Button title="Sair" onPress={handleLogout} color="#ff3b30" />
      </View>

      <QRCodeGenerator db={db} />

      <PDFGenerator 
        db={db} 
        savedDocuments={savedDocuments}
        onDocumentGenerated={loadSavedDocuments}
        onRemoveDocument={removeDocument}
      />
    </ScrollView>
  );
}