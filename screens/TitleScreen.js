// TitleScreen.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_PADDING = 20;

const TitleScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to SlinkyConnect</Text>
        <Text style={styles.subtitle}>
          Your personal stress‑detecting sloth companion
        </Text>

        {/* Enter App Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.replace('Main')}
        >
          <Text style={styles.primaryButtonText}>Enter App</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1C2C',
  },
  headerContainer: {
    paddingHorizontal: CARD_PADDING,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#0C1C2C',
  },
  headerBox: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: CARD_PADDING,
  },
  title: {
    color: '#5DFDCB',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    color: '#A0D8EF',
    fontSize: 14,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 20,
  },

  primaryButton: {
    backgroundColor: '#5DFDCB',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 40,
    width: width * 0.6,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#0C1C2C',
    fontSize: 16,
    fontWeight: 'bold',
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: '#5DFDCB',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 40,
    width: width * 0.6,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#5DFDCB',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TitleScreen;
