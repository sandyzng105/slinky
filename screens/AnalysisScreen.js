import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

const AnalysisScreen = () => {
    const screenWidth = Dimensions.get('window').width;
    const chartWidth = screenWidth - 20*2 - 16*2;
  
    //dummy data
    const weeklyData = [28, 70, 85, 60, 42, 30, 50];
  
    const barColors = weeklyData.map(val => {
      if (val < 33) {
        // low
        return (opacity = 1) => `rgba(93,253,203,${opacity})`;
      } else if (val < 66) {
        // medium
        return (opacity = 1) => `rgba(242,201,76,${opacity})`;
      } else {
        // high
        return (opacity = 1) => `rgba(235,87,87,${opacity})`;
      }
    });
  
    const barData = {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [
        {
          data: weeklyData,
          colors: barColors
        }
      ]
    };

    const avgStress = Math.round(weeklyData.reduce((sum, val) => sum + val, 0) / weeklyData.length);

    const peakValue = Math.max(...weeklyData);
    const peakIndex = weeklyData.indexOf(peakValue);
    const peakDay = {
      day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][peakIndex],
      value: peakValue,
      level: peakValue > 70 ? 'high' : peakValue > 40 ? 'medium' : 'low'
    };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>Stress Analysis</Text>
        </View>

        {/* Chart Card */}
        <View style={styles.chartContainer}>
          {/* Title + Date */}
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Weekly Overview</Text>
            <Text style={styles.chartDate}>April 21–27, 2025</Text>
          </View>

          {/* Color‑coded BarChart */}
          <BarChart
            data={barData}
            width={chartWidth}
            height={180}
            fromZero
            showBarTops={false}
            withInnerLines={false}
            chartConfig={{
                backgroundGradientFrom: '#142A3E',
                backgroundGradientTo: '#142A3E',
                decimalPlaces: 0,
                color: () => `rgba(93,253,203,1)`,
                labelColor: () => `rgba(255,255,255,0.8)`,
                style: { borderRadius: 16 },
                propsForBackgroundLines: {
                strokeWidth: 0 
                },
                barRadius: 4,
                barPercentage: 0.6, 
            }}
            withCustomBarColorFromData={true}
            flatColor={true}
            style={{
                marginVertical: 8,
                borderRadius: 16,
                marginLeft: -12, 
            }}
            verticalLabelRotation={0} 
            xLabelsOffset={-10} 
            />

          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: '#5DFDCB' }]}
              />
              <Text style={styles.legendText}>Low</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: '#F2C94C' }]}
              />
              <Text style={styles.legendText}>Medium</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: '#EB5757' }]}
              />
              <Text style={styles.legendText}>High</Text>
            </View>
          </View>
        </View>

        {/* View Full Report Button */}
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>View Full Report →</Text>
        </TouchableOpacity>

        {/* stat cards */}
        <View style={styles.statsRow}>
            <View style={[styles.statCard, { marginRight: 10 }]}>
                <View style={styles.statHeader}>
                <Text style={styles.statTitle}>Avg. Stress Level</Text>
                <Ionicons name="pulse-outline" size={16} color="#5DFDCB" />
                </View>
                <View style={styles.statValueRow}>
                <Text style={styles.statNumber}>{avgStress}</Text>
                <Text style={styles.statUnit}>%</Text>
                </View>
                <Text style={styles.statSubtext}>
                {avgStress < 40 ? 'Good balance' : 
                avgStress < 70 ? 'Moderate stress' : 'High stress period'}
                </Text>
            </View>
            
            <View style={styles.statCard}>
                <View style={styles.statHeader}>
                <Text style={styles.statTitle}>Peak Stress Day</Text>
                <Ionicons name="alert-outline" size={16} color="#5DFDCB" />
                </View>
                <Text style={[styles.statNumber, { color: 
                peakDay.level === 'high' ? '#EB5757' : 
                peakDay.level === 'medium' ? '#F2C94C' : '#5DFDCB' }]}>
                {peakDay.day}
                </Text>
                <Text style={styles.statSubtext}>
                {peakDay.value}% stress level
                </Text>
            </View>
            </View>

        {/* Trend indicator card */}
        <View style={[styles.statCard, { marginBottom: 20 }]}>
          <View style={styles.statHeader}>
            <Text style={styles.statTitle}>Weekly Trend</Text>
            <Ionicons name="trending-up-outline" size={16} color="#5DFDCB" />
          </View>
          <View style={styles.trendContainer}>
            <Ionicons name="arrow-up" size={24} color="#5DFDCB" />
            <Text style={styles.trendText}>12% increase from last week</Text>
          </View>
        </View>
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
    paddingTop: 50,
  },
  headerBox: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    marginTop: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  chartContainer: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartDate: {
    color: '#A0D8EF',
    fontSize: 12,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    color: '#fff',
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    color: '#A0D8EF',
    fontSize: 12,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  statNumber: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 4,
  },
  statUnit: {
    color: '#A0D8EF',
    fontSize: 12,
    marginBottom: 4,
  },
  statSubtext: {
    color: '#A0D8EF',
    fontSize: 12,
    marginTop: 4,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  trendText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },

  reportButton: {
    backgroundColor: '#1E3A5A',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5DFDCB',
    marginBottom: 20,
  },
  reportButtonText: {
    color: '#5DFDCB',
    fontWeight: 'bold',
    fontSize: 16,
  },

  statsRow: {
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statTitle: {
    color: '#fff',
    fontSize: 12,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  statNumber: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  statUnit: {
    color: '#A0D8EF',
    fontSize: 12,
    marginLeft: 4,
    marginBottom: 2,
  },
});

export default AnalysisScreen;
