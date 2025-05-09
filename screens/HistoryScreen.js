import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { format, subDays, parseISO } from 'date-fns';

const HistoryScreen = () => {
  //dummy data
  const sessions = [
    { date: '2025-04-27', duration: 70, avgStress: 50, peakStress: 68 },
    { date: '2025-04-26', duration: 65, avgStress: 30, peakStress: 45 },
    { date: '2025-04-25', duration: 80, avgStress: 42, peakStress: 78 },
    { date: '2025-04-24', duration: 60, avgStress: 60, peakStress: 40 },
    { date: '2025-04-23', duration: 85, avgStress: 85, peakStress: 72 },
    { date: '2025-04-22', duration: 68, avgStress: 70, peakStress: 60 },
    { date: '2025-04-21', duration: 71, avgStress: 28, peakStress: 65 },
  ];


const sortedSessions = sessions
.slice()
.sort((a,b) => new Date(a.date) - new Date(b.date));

const chartData = {
labels: sortedSessions.map(s => format(parseISO(s.date), 'EEE')),
datasets: [
  {
    data:   sortedSessions.map(s => s.avgStress),
    color:  (opacity = 1) => `rgba(93, 253, 203, ${opacity})`,
    strokeWidth: 2,
  }
]
};

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - (20 * 2) - (16 * 2);

  return (
    <View style={styles.container}>
      
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerBox}>
            <Text style={styles.headerTitle}>Stress History</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Last 7 Days</Text>
              <Ionicons name="chevron-down" size={16} color="#5DFDCB" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Avg. Stress</Text>
            <Text style={styles.summaryValue}>42%</Text>
            <Text style={styles.summaryTrend}>
              <Ionicons name="arrow-up" size={14} color="#EB5757" /> 8% from last week
            </Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Sessions</Text>
            <Text style={styles.summaryValue}>7</Text>
            <Text style={styles.summaryTrend}>
              <Ionicons name="arrow-down" size={14} color="#5DFDCB" /> 2 less than last week
            </Text>
          </View>
        </View>

        {/* Main Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Weekly Stress Levels</Text>
          <LineChart
            data={chartData}
            width={chartWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#142A3E',
              backgroundGradientFrom: '#142A3E',
              backgroundGradientTo: '#1E3A5A',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#5DFDCB',
                alignSelf: 'center'
              }
            }}
            bezier
            style={{ marginTop: 10, borderRadius: 8 }}
          />
        </View>

        {/* Session List */}
        <View style={styles.sessionsHeader}>
          <Text style={styles.sessionsTitle}>Recent Sessions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {sessions.map((session, index) => (
          <View key={index} style={styles.sessionCard}>
            <View style={styles.sessionDate}>
              <Text style={styles.sessionDay}>{format(parseISO(session.date), 'EEE')}</Text>
              <Text style={styles.sessionFullDate}>{format(parseISO(session.date), 'MMM d')}</Text>
            </View>
            <View style={styles.sessionStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Avg</Text>
                <Text style={[
                  styles.statValue,
                  { color: session.avgStress > 70 ? '#EB5757' : session.avgStress > 40 ? '#F2C94C' : '#5DFDCB' }
                ]}>
                  {session.avgStress}%
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Peak</Text>
                <Text style={[
                  styles.statValue,
                  { color: session.peakStress > 70 ? '#EB5757' : session.peakStress > 40 ? '#F2C94C' : '#5DFDCB' }
                ]}>
                  {session.peakStress}%
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Duration</Text>
                <Text style={styles.statValue}>{session.duration}m</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0D8EF" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1C2C',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
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
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#142A3E',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterText: {
    color: '#5DFDCB',
    marginRight: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    width: '48%',
  },
  summaryLabel: {
    color: '#A0D8EF',
    fontSize: 12,
    marginBottom: 4,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryTrend: {
    color: '#A0D8EF',
    fontSize: 12,
  },
  chartContainer: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  chartTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sessionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sessionsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#5DFDCB',
    fontSize: 14,
  },
  sessionCard: {
    backgroundColor: '#142A3E',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionDate: {
    marginRight: 16,
    alignItems: 'center',
    width: 60,
  },
  sessionDay: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sessionFullDate: {
    color: '#A0D8EF',
    fontSize: 12,
  },
  sessionStats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#A0D8EF',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoryScreen;