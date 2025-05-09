import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

const HomeScreen = () => {
  const [battery, setBattery] = useState(87);
  const [stress, setStress] = useState(28);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [calibrateActive, setCalibrateActive] = useState(false);
  const [detectionActive, setDetectionActive] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [stressData, setStressData] = useState([]);
  const [timeData, setTimeData] = useState([]);

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - (20 * 2) - (16 * 2); // scroll + container padding


  // Simulate BLE data reception
  useEffect(() => {
    let interval;
    if (detectionActive) {
      interval = setInterval(() => {
        // Simulate receiving new stress data from BLE
        const newStress = Math.floor(Math.random() * 30) + 20; // Random value between 20-50
        const newTime = new Date().toLocaleTimeString([], {
          hour:   'numeric',
          minute: '2-digit',
          hour12: true,    // or false for 24‑hour time
        });
        
        setStress(newStress);
        setStressData(prev => [...prev.slice(-9), newStress]); // Keep last 10 values
        setTimeData(prev => [...prev.slice(-9), newTime]); // Keep last 10 values
      }, 2000); // Update every 2 seconds
    } else {
      setStressData([]);
      setTimeData([]);
    }

    return () => clearInterval(interval);
  }, [detectionActive]);

  useEffect(() => {
    let timer;
    if (calibrateActive) {
      timer = setTimeout(() => {
        setCalibrateActive(false);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [calibrateActive]);

  const handleCalibratePress = () => {
    if (!calibrateActive) {
      setCalibrateActive(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with background box */}
      <View style={styles.headerContainer}>
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>SlinkyConnect</Text>
          <TouchableOpacity onPress={() => setInfoModalVisible(true)}>
            <Ionicons name="information-circle" size={24} color="#A0D8EF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Connection Card */}
        <View style={styles.connectionCard}>
          <Image source={require('../assets/sloth.png')} style={styles.sloth} />
          <View style={{ flex: 1 }}>
            <Text style={styles.statusTitle}>Hey there!</Text>
            <Text style={styles.statusSubtitle}>Slinky is connected</Text>
            <Text style={styles.battery}>🔋 Battery: {battery}%</Text>
          </View>
          <Ionicons name="settings-outline" size={24} color="#A0D8EF" />
        </View>

        {/* Calibrate Button */}
        <TouchableOpacity 
          style={[styles.actionButton, calibrateActive && styles.activeButton]}
          onPress={handleCalibratePress}
        >
          <View>
            <Text style={styles.buttonTitle}>
              {calibrateActive ? 'Calibrating...' : 'Calibrate'}
            </Text>
            <Text style={styles.buttonSubtitle}>
              {calibrateActive ? 'Measuring baseline...' : '10-second baseline measurement'}
            </Text>
          </View>
          <View style={[styles.buttonIndicator, calibrateActive && styles.activeIndicator]} />
        </TouchableOpacity>

        {/* Detection Button */}
        <TouchableOpacity 
          style={[styles.actionButton, detectionActive && styles.activeButton]}
          onPress={() => setDetectionActive(!detectionActive)}
        >
          <View>
            <Text style={styles.buttonTitle}>
              {detectionActive ? 'Detection Active' : 'Start Detection'}
            </Text>
            <Text style={styles.buttonSubtitle}>Monitor stress in real-time</Text>
          </View>
          <View style={[styles.buttonIndicator, detectionActive && styles.activeIndicator]} />
        </TouchableOpacity>

        {/* Vibration Button */}
        <TouchableOpacity 
          style={[styles.actionButton, vibrationEnabled && styles.activeButton]}
          onPress={() => setVibrationEnabled(!vibrationEnabled)}
        >
          <View>
            <Text style={styles.buttonTitle}>Soothing Vibrations</Text>
            <Text style={styles.buttonSubtitle}>
              {vibrationEnabled ? 'Currently active' : 'Comforting haptic feedback'}
            </Text>
          </View>
          <View style={[styles.buttonIndicator, vibrationEnabled && styles.activeIndicator]} />
        </TouchableOpacity>

        {/* Stress Level Card */}
        <View style={styles.stressCard}>
          <View style={styles.stressText}>
            <Text style={styles.stressLabel}>Current stress level</Text>
            <Text style={styles.stressValue}>
              {stress < 33 ? 'Low' : stress < 66 ? 'Medium' : 'High'}
            </Text>
          </View>
          <Progress.Circle
            size={72}
            progress={stress / 100}
            showsText
            formatText={() => `${stress}%`}
            thickness={8}
            color="#5DFDCB"
            unfilledColor="#1E3A5A"
            borderWidth={0}
            textStyle={styles.stressPercent}
          />
        </View>

        {/* Real-time Stress Graph (only shown when start detection is active) */}
        {detectionActive && (
          <View style={styles.graphContainer}>
            <Text style={styles.graphTitle}>Real-time Stress Levels</Text>
            {stressData.length > 0 ? (
              <LineChart
                data={{
                  labels: timeData,
                  datasets: [
                    {
                      data: stressData,
                      color: (opacity = 1) => `rgba(93, 253, 203, ${opacity})`,
                      strokeWidth: 2
                    }
                  ],
                }}
                width={chartWidth}
                height={220}
                chartConfig={{
                  backgroundColor: '#142A3E',
                  backgroundGradientFrom: '#142A3E',
                  backgroundGradientTo: '#1E3A5A',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: '#5DFDCB'
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  alignSelf: 'center',
                }}
                formatXLabel={(value, index) =>
                  index % 2 === 0 ? value : ''
                }
              />
            ) : (
              <Text style={styles.graphLoading}>Waiting for data...</Text>
            )}
          </View>
        )}
      </ScrollView>

      {/* Info Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={infoModalVisible}
        onRequestClose={() => setInfoModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>How SlinkyConnect Works</Text>
            <Text style={styles.modalText}>
              SlinkyConnect pairs with your Slinky stress-detection stuffed animal to help monitor and manage stress levels.
            </Text>
            <Text style={styles.modalText}>
              • Calibrate: Establish a 10-second baseline measurement for accurate stress detection
            </Text>
            <Text style={styles.modalText}>
              • Start Detection: Monitor your stress levels in real-time
            </Text>
            <Text style={styles.modalText}>
              • Soothing Vibrations: Enable comforting haptic feedback when stress is detected
            </Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setInfoModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Got It!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1C2C',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#0C1C2C',
  },
  headerBox: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40, 
    backgroundColor: '#0C1C2C',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    color: '#5DFDCB',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#5DFDCB',
    borderRadius: 8,
    padding: 12,
    marginTop: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#0C1C2C',
    fontWeight: 'bold',
  },
  
  statusCard: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sloth: { width: 60, height: 60, marginRight: 10 },
  statusTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  statusSubtitle: { color: '#A0D8EF', fontSize: 12 },
  battery: { color: '#B0F2B6', marginTop: 4 },
  stressCircle: { alignItems: 'center' },
  stressLabel: { color: '#ddd', fontSize: 12 },
  stressValue: { color: '#5DFDCB', fontSize: 16, fontWeight: 'bold' },
  stressPercent: { color: '#fff', fontSize: 18 },
  actionButton: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  activeButton: {
    backgroundColor: '#1E3A5A',
    borderWidth: 1,
    borderColor: '#5DFDCB'
  },
  buttonTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  buttonSubtitle: { color: '#A0D8EF', fontSize: 12, marginTop: 4 },
  buttonIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#142A3E',
    borderWidth: 1,
    borderColor: '#5DFDCB'
  },
  activeIndicator: {
    backgroundColor: '#5DFDCB'
  },
  graphContainer: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  graphTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  graphLoading: {
    color: '#A0D8EF',
    textAlign: 'center',
    padding: 20,
  },
  connectionCard: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  stressCard: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,      // Add top margin
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,       // Add shadow for Android
  },
  stressText: {
    flex: 1,
  },
  stressLabel: {
    color: '#ddd',
    fontSize: 12,
    marginBottom: 4,
  },
  stressValue: {
    color: '#5DFDCB',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stressPercent: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default HomeScreen;