import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  //dummy data
  const user = {
    name: 'Wendy Wellesley',
    classYear: '2025',
    defaultAvatar: require('../assets/sloth.png'),
    stats: {
      sessions: 142,
      totalTime: '71h',
      avgStress: '42%'
    },
    interests: ['Yoga','Reading','Meditation','Nature','Art'],
    relaxItems: [
      { icon: 'musical-notes-outline', label: 'Classical Music' },
      { icon: 'cafe-outline',          label: 'Herbal Tea' },
      { icon: 'book-outline',          label: 'Reading Fiction' },
      { icon: 'leaf-outline',          label: 'Lake Walks' },
    ]
  };

  //hold profile pic
  const [avatarUri, setAvatarUri] = useState(null);

  const handleChangePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need permission to access your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, 
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.cancelled) {
      setAvatarUri(result.uri);
    }
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>SlinkyConnect</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#A0D8EF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Avatar & Name */}
        <View style={styles.avatarContainer}>
          <Image
            source={avatarUri ? { uri: avatarUri } : user.defaultAvatar}
            style={styles.avatar}
          />
          <TouchableOpacity
            style={styles.photoButton}
            onPress={handleChangePhoto}
          >
            <Ionicons name="camera-outline" size={18} color="#0C1C2C" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.classYear}> Class of {user.classYear}</Text>

        {/* Stats Row */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{user.stats.sessions}</Text>
            <Text style={styles.summaryLabel}>Sessions</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{user.stats.totalTime}</Text>
            <Text style={styles.summaryLabel}>Total Time</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{user.stats.avgStress}</Text>
            <Text style={styles.summaryLabel}>Avg Stress</Text>
          </View>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="heart-outline" size={18} color="#5DFDCB" />
            <Text style={styles.sectionTitle}>Interests</Text>
          </View>
          <View style={styles.tagsContainer}>
            {user.interests.map(tag => (
              <View style={styles.tag} key={tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* What Relaxes Me */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cloud-outline" size={18} color="#5DFDCB" />
            <Text style={styles.sectionTitle}>What Relaxes Me</Text>
          </View>
          {user.relaxItems.map(item => (
            <View style={styles.listItem} key={item.label}>
              <Ionicons name={item.icon} size={20} color="#5DFDCB" />
              <Text style={styles.listItemText}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1C2C',
  },
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#0C1C2C',
  },
  headerBox: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  avatarContainer: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#5DFDCB',
  },
  photoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5DFDCB',
    borderRadius: 14,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  classYear: {
    color: '#A0D8EF',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#142A3E',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  summaryValue: {
    color: '#5DFDCB',
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },

  section: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#1E3A5A',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A5A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  listItemText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 12,
  },
});

export default ProfileScreen;
