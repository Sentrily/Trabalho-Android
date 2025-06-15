import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
    padding: 16,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 17,
    color: '#8e8e93',
  },
  
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 24,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1c1c1e',
  },
  loginSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#8e8e93',
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 8,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1c1c1e',
  },
  
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1c1c1e',
    textAlign: 'center',
  },
  
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#3c3c43',
    textAlign: 'left'
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#d1d1d6',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#1c1c1e',
    marginBottom: 8,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  
  loginButton: {
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  generateButton: {
    marginTop: 12,
    marginBottom: 8,
  },
  
  hint: {
    textAlign: 'center',
    fontSize: 14,
    color: '#8e8e93',
    fontStyle: 'italic',
    marginTop: 12,
    paddingHorizontal: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#8e8e93',
    padding: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
  
  documentItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007aff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  documentTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  documentAuthor: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 2,
  },
  documentDate: {
    fontSize: 13,
    color: '#8e8e93',
    marginBottom: 12,
  },
  documentActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  
  // QR Code
  qrCodeContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  qrCodeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 8,
    textAlign: 'center',
  },
  qrCodeUrl: {
    fontSize: 14,
    color: '#007aff',
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#f0f8ff',
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d0e7ff',
    maxWidth: '100%',
  },
  qrCodeWrapper: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  qrCodeActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 8,
  },

  buyerSection: {
    backgroundColor: '#ffebee',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#d32f2f',
    marginBottom: 16,
  },
  sellerSection: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  buyerLabel: {
    color: '#d32f2f',
  },
  sellerLabel: {
    color: '#1976d2',
  },

  successText: {
    color: '#34c759',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 8,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 8,
  },

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  loadingSpinner: {
    marginRight: 8,
  },
});
