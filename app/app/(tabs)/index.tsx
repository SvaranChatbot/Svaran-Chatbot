import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, 
  Image, ActivityIndicator, Alert, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'bn', name: 'Bengali' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'ur', name: 'Urdu' }
];

// Fix localhost access for Android emulator
const SERVER_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:8080'  // Android emulator special alias
  : 'http://localhost:8080'; // iOS simulator and others

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const App = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Svaran, the IIT Jammu chatbot. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [languageLoading, setLanguageLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const flatListRef = useRef<FlatList>(null);

  const setAppLanguage = async (lang: string) => {
    setLanguageLoading(true);
    try {
      const res = await axios.post(`${SERVER_URL}/set_language`, { language: lang });
      setLanguage(lang);
      console.log(res.data.message);
    } catch (error) {
      console.error('Error setting language:', error);
      Alert.alert('Error', 'Failed to set language on server.');
    } finally {
      setLanguageLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage = { 
      id: Date.now().toString(), 
      text: inputText, 
      isUser: true,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const res = await axios.post(`${SERVER_URL}/predict`, { 
        message: inputText 
      });

      if (res.data.error) {
        throw new Error(res.data.error);
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: res.data.answer || "Sorry, I didn't understand that.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Message send error:', error);
      setMessages((prev) => [
        ...prev,
        { 
          id: (Date.now() + 1).toString(), 
          text: "Error: Could not get response from server.", 
          isUser: false,
          timestamp: new Date()
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const startNewChat = () => {
    setMessages([{
      id: '1',
      text: "Hi there! I'm Svaran, the IIT Jammu chatbot. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }]);
    setInputText('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    setAppLanguage(language);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <Text style={styles.greeting}>Svarav : IIT Jammu Chatbot</Text>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.newChatButton} onPress={startNewChat}>
          <Text style={styles.newChatText}>+ New Chat</Text>
        </TouchableOpacity>

        <View style={styles.languagePickerContainer}>
          {languageLoading ? (
            <ActivityIndicator size="small" color="#007bff" style={styles.languageLoader} />
          ) : (
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={language}
                style={styles.languagePicker}
                onValueChange={(itemValue) => {
                  setAppLanguage(itemValue);
                }}
                dropdownIconColor="#007bff"
                mode="dropdown"
              >
                {LANGUAGES.map((lang) => (
                  <Picker.Item 
                    key={lang.code} 
                    label={lang.name} 
                    value={lang.code} 
                    style={language === lang.code ? styles.selectedItem : styles.pickerItem} 
                  />
                ))}
              </Picker>
              <Text style={styles.selectedLanguageText}>
                {LANGUAGES.find(l => l.code === language)?.name || 'English'}
              </Text>
            </View>
          )}
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timeText}>{formatTime(item.timestamp)}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            inputText.trim() ? styles.inputActive : null
          ]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          onSubmitEditing={sendMessage}
          editable={!loading}
          multiline
        />
        {loading ? (
          <ActivityIndicator size="small" color="#007bff" style={styles.sendButton} />
        ) : (
          <TouchableOpacity 
            onPress={sendMessage} 
            style={styles.sendButton} 
            disabled={!inputText.trim()}
          >
            <Image 
              source={require('../assets/send.png')} 
              style={[styles.sendIcon, !inputText.trim() && styles.disabledSendIcon]} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    padding: 16 
  },
  logo: { 
    width: 100, 
    height: 100, 
    alignSelf: 'center', 
    marginBottom: 10 
  },
  greeting: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#333', 
    marginBottom: 10 
  },
  controlsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10,
  },
  newChatButton: {
    backgroundColor: '#007bff', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderRadius: 10,
  },
  newChatText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  languagePickerContainer: { 
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerWrapper: {
    position: 'relative',
    width: 150,
  },
  languagePicker: {
    height: 40, 
    width: '100%', 
    backgroundColor: 'transparent',
    opacity: 0,
  },
  selectedLanguageText: {
    position: 'absolute',
    left: 0,
    top: 10,
    width: '100%',
    textAlign: 'center',
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pickerItem: {
    color: '#333',
  },
  selectedItem: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  languageLoader: {
    width: 120,
    height: 40,
  },
  chatContainer: {
    flexGrow: 1, 
    justifyContent: 'flex-end', 
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: '80%', 
    padding: 12, 
    borderRadius: 12, 
    marginVertical: 6,
  },
  userMessage: {
    backgroundColor: '#007bff', 
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#35cc5d', 
    alignSelf: 'flex-start',
  },
  messageText: { 
    color: '#fff', 
    fontSize: 16,
    marginBottom: 4,
  },
  timeText: {
    color: '#fff',
    fontSize: 10,
    opacity: 0.8,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    borderTopWidth: 1,
    borderTopColor: '#ddd', 
    paddingTop: 10, 
    backgroundColor: '#fff', 
    paddingHorizontal: 10,
  },
  input: {
    flex: 1, 
    backgroundColor: '#fff', 
    borderRadius: 20,
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    marginRight: 10,
    borderWidth: 1, 
    borderColor: '#ddd', 
    color: '#333',
    maxHeight: 100,
  },
  inputActive: {
    borderColor: 'green',
  },
  sendIcon: {
    width: 40, 
    height: 40, 
    resizeMode: 'contain',
    tintColor: '#007bff',
  },
  disabledSendIcon: {
    tintColor: '#ccc',
  },
  sendButton: {
    padding: 5,
  },
});

export default App;