import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// CONFIG: change this to your running backend URL (include http:// or https://)
const API_URL = 'https://lqxkbznmoyrdamcsddev.supabase.co:3000';

export default function App() {
  const [text, setText] = useState('ok cool');
  const [loading, setLoading] = useState(false);
  const [interpretations, setInterpretations] = useState([]);
  const [error, setError] = useState(null);

  async function handleOverthink() {
    setError(null);
    if (!text || text.trim().length === 0) {
      setError('Type a message first');
      return;
    }
    setLoading(true);
    setInterpretations([]);
    try {
      const res = await fetch(`${API_URL}/overthink`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');
      setInterpretations(data.interpretations || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}}>
        <View style={styles.card}>
          <Text style={styles.title}>Overthinkr</Text>
          <Text style={styles.subtitle}>Paste a message and get 10 hilarious interpretations</Text>

          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Type a message..."
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={handleOverthink} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Overthink it</Text>}
          </TouchableOpacity>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <FlatList
            data={interpretations}
            keyExtractor={(item, idx) => `${idx}`}
            style={{marginTop:16}}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <Text style={styles.itemIndex}>{index + 1}.</Text>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            )}
            ListEmptyComponent={() => (
              <Text style={styles.muted}>No results yet — try "ok cool"</Text>
            )}
          />
        </View>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7fb' },
  card: { flex: 1, padding: 20, maxWidth: 900, alignSelf: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 6 },
  subtitle: { color: '#666', marginBottom: 12 },
  input: { minHeight: 80, backgroundColor: '#fff', borderRadius: 10, padding: 12, fontSize: 16, borderWidth: 1, borderColor: '#eee' },
  button: { marginTop: 12, backgroundColor: '#7c5cff', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  error: { color: 'crimson', marginTop: 8 },
  muted: { color: '#999', textAlign: 'center', marginTop: 16 },
  item: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f1f1f6' },
  itemIndex: { width: 24, color: '#555', fontWeight: '700' },
  itemText: { flex: 1, color: '#222' }
});
