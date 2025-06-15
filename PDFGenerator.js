import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { styles } from './AppStyles';

export default function PDFGenerator({ db, savedDocuments, onDocumentGenerated, onRemoveDocument }) {
  const [conteudo, setConteudo] = useState('');
  
  // Comprador
  const [compradorNome, setCompradorNome] = useState('');
  const [compradorEndereco, setCompradorEndereco] = useState('');
  const [compradorBairro, setCompradorBairro] = useState('');
  const [compradorCidade, setCompradorCidade] = useState('');
  const [compradorCep, setCompradorCep] = useState('');
  
  // Vendedor
  const [vendedorNome, setVendedorNome] = useState('');
  const [vendedorEndereco, setVendedorEndereco] = useState('');
  const [vendedorBairro, setVendedorBairro] = useState('');
  const [vendedorCidade, setVendedorCidade] = useState('');
  const [vendedorCep, setVendedorCep] = useState('');
  const [vendedorCnpj, setVendedorCnpj] = useState('');

  // Gera HTML 
  function generateHTML() {
    const currentDate = new Date().toLocaleDateString('pt-BR');
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
              margin: 30px; 
              line-height: 1.6; 
              font-size: 20px;
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 2px solid #007aff; 
              padding-bottom: 15px; 
            }
            .title { 
              font-size: 28px; 
              font-weight: bold; 
              color: #007aff; 
            }
            .content { 
              font-size: 20px; 
              margin: 20px 0; 
              white-space: pre-wrap; 
            }
            .comprador-section {
              background-color: #ffebee;
              border-left: 5px solid #d32f2f;
              padding: 20px;
              margin: 20px 0;
              border-radius: 8px;
            }
            .vendedor-section {
              background-color: #e3f2fd;
              border-left: 5px solid #1976d2;
              padding: 20px;
              margin: 20px 0;
              border-radius: 8px;
            }
            .section-title {
              font-size: 22px;
              font-weight: bold;
              margin-bottom: 15px;
            }
            .comprador-title {
              color: #d32f2f;
            }
            .vendedor-title {
              color: #1976d2;
            }
            .field {
              margin-bottom: 8px;
              font-size: 20px;
            }
            .footer { 
              margin-top: 30px; 
              font-size: 16px; 
              color: #999; 
              text-align: center; 
            }
          </style>
        </head>
        <body>

          
          ${compradorNome || compradorEndereco || compradorBairro || compradorCidade || compradorCep ? `
          <div class="comprador-section">
            <div class="section-title comprador-title">COMPRADOR</div>
            ${compradorNome ? `<div class="field"><strong>Nome:</strong> ${compradorNome}</div>` : ''}
            ${compradorEndereco ? `<div class="field"><strong>Endereço:</strong> ${compradorEndereco}</div>` : ''}
            ${compradorBairro ? `<div class="field"><strong>Bairro:</strong> ${compradorBairro}</div>` : ''}
            ${compradorCidade ? `<div class="field"><strong>Cidade:</strong> ${compradorCidade}</div>` : ''}
            ${compradorCep ? `<div class="field"><strong>CEP:</strong> ${compradorCep}</div>` : ''}
          </div>` : ''}
          
          ${vendedorNome || vendedorEndereco || vendedorBairro || vendedorCidade || vendedorCep || vendedorCnpj ? `
          <div class="vendedor-section">
            <div class="section-title vendedor-title">VENDEDOR</div>
            ${vendedorNome ? `<div class="field"><strong>Nome:</strong> ${vendedorNome}</div>` : ''}
            ${vendedorEndereco ? `<div class="field"><strong>Endereço:</strong> ${vendedorEndereco}</div>` : ''}
            ${vendedorBairro ? `<div class="field"><strong>Bairro:</strong> ${vendedorBairro}</div>` : ''}
            ${vendedorCidade ? `<div class="field"><strong>Cidade:</strong> ${vendedorCidade}</div>` : ''}
            ${vendedorCep ? `<div class="field"><strong>CEP:</strong> ${vendedorCep}</div>` : ''}
            ${vendedorCnpj ? `<div class="field"><strong>CNPJ:</strong> ${vendedorCnpj}</div>` : ''}
          </div>` : ''}
          
          ${conteudo ? `<div class="content">${conteudo}</div>` : ''}
          
          <div class="footer">Gerado em: ${currentDate}</div>
        </body>
      </html>
    `;
  }

  async function generatePDF() {
    const hasCompradorData = compradorNome || compradorEndereco || compradorBairro || compradorCidade || compradorCep;
    const hasVendedorData = vendedorNome || vendedorEndereco || vendedorBairro || vendedorCidade || vendedorCep || vendedorCnpj;
    const hasContent = conteudo.trim();

    if (!hasCompradorData && !hasVendedorData && !hasContent) {
      Alert.alert('Aviso', 'Preencha pelo menos um campo');
      return;
    }

    try {
      const { uri } = await Print.printToFileAsync({
        html: generateHTML(),
        base64: false,
      });

      if (db) {
        await db.runAsync(
          'INSERT INTO documents (titulo, autor, data, uri) VALUES (?, ?, ?, ?)',
          ['Documento ' + new Date().toLocaleString('pt-BR'), 'Sistema', new Date().toLocaleDateString('pt-BR'), uri]
        );
        onDocumentGenerated();
      }

      Alert.alert('PDF Gerado!', 'O que fazer?', [
        { text: 'Ver', onPress: () => Print.printAsync({ uri }) },
        { text: 'Compartilhar', onPress: () => Sharing.shareAsync(uri) },
        { text: 'OK', style: 'cancel' },
      ]);

      // Limpar formulário
      setConteudo('');
      setCompradorNome('');
      setCompradorEndereco('');
      setCompradorBairro('');
      setCompradorCidade('');
      setCompradorCep('');
      setVendedorNome('');
      setVendedorEndereco('');
      setVendedorBairro('');
      setVendedorCidade('');
      setVendedorCep('');
      setVendedorCnpj('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível gerar PDF');
    }
  }

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Novo Documento</Text>

        // vendendor 
        <View style={[styles.inputContainer, { backgroundColor: '#ffebee', padding: 12, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#d32f2f' }]}>
          <Text style={[styles.label, { color: '#d32f2f', fontWeight: 'bold', fontSize: 16 }]}>COMPRADOR</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nome do Comprador"
            placeholderTextColor='lightgray'
            value={compradorNome}
            onChangeText={setCompradorNome}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            placeholderTextColor='lightgray'
            value={compradorEndereco}
            onChangeText={setCompradorEndereco}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            placeholderTextColor='lightgray'
            value={compradorBairro}
            onChangeText={setCompradorBairro}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Cidade - Estado"
            placeholderTextColor='lightgray'
            value={compradorCidade}
            onChangeText={setCompradorCidade}
          />
          
          <TextInput
            style={styles.input}
            placeholder="CEP"
            placeholderTextColor='lightgray'
            value={compradorCep}
            onChangeText={setCompradorCep}
            keyboardType="numeric"
          />
        </View>

       
        <View style={[styles.inputContainer, { backgroundColor: '#e3f2fd', padding: 12, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#1976d2' }]}>
          <Text style={[styles.label, { color: '#1976d2', fontWeight: 'bold', fontSize: 16 }]}>VENDEDOR</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nome do Vendedor"
            placeholderTextColor='lightgray'
            value={vendedorNome}
            onChangeText={setVendedorNome}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            placeholderTextColor='lightgray'
            value={vendedorEndereco}
            onChangeText={setVendedorEndereco}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            placeholderTextColor='lightgray'
            value={vendedorBairro}
            onChangeText={setVendedorBairro}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Cidade - Estado"
            placeholderTextColor='lightgray'
            value={vendedorCidade}
            onChangeText={setVendedorCidade}
          />
          
          <TextInput
            style={styles.input}
            placeholder="CEP"
            placeholderTextColor='lightgray'
            value={vendedorCep}
            onChangeText={setVendedorCep}
            keyboardType="numeric"
          />
          
          <TextInput
            style={styles.input}
            placeholder="CNPJ"
            placeholderTextColor='lightgray'
            value={vendedorCnpj}
            onChangeText={setVendedorCnpj}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Adicional:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Conteúdo adicional"
            placeholderTextColor='lightgray'
            value={conteudo}
            onChangeText={setConteudo}
            multiline
            numberOfLines={4}
          />
        </View>

        <Button title="Gerar PDF" onPress={generatePDF} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Documentos ({savedDocuments.length})
        </Text>

        {savedDocuments.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum documento</Text>
        ) : (
          savedDocuments.map((doc) => (
            <View key={doc.id} style={styles.documentItem}>
              <Text style={styles.documentTitle}>{doc.titulo}</Text>
              <Text style={styles.documentAuthor}>Sistema: {doc.autor}</Text>
              <Text style={styles.documentDate}>Data: {doc.data}</Text>
              <View style={styles.documentActions}>
                <Button
                  title="Ver"
                  onPress={() => Print.printAsync({ uri: doc.uri })}
                  color="#007aff"
                />
                <Button
                  title="Compartihar"
                  onPress={() => Sharing.shareAsync(doc.uri)}
                  color="#34c759"
                />
                <Button
                  title="Del"
                  onPress={() => onRemoveDocument(doc.id)}
                  color="#ff3b30"
                />
              </View>
            </View>
          ))
        )}
      </View>
    </>
  );
}
