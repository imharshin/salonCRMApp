import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';
import { Clock } from 'lucide-react-native';

const AppointmentCard = ({ appointment, width, x, color }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { 
          left: x, 
          width: width - 4, // Add small gap
          backgroundColor: color + '20', // Light version of stylist color
          borderLeftColor: color,
        }
      ]}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Text style={styles.clientName} numberOfLines={1}>
          {appointment.clientName}
        </Text>
        <Text style={styles.service} numberOfLines={1}>
          {appointment.service}
        </Text>
        <View style={styles.footer}>
          <Clock size={10} color={theme.colors.textSecondary} />
          <Text style={styles.timeText}>
            {appointment.start.split('T')[1].substring(0, 5)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    height: 54,
    borderRadius: theme.borderRadius.md,
    borderLeftWidth: 4,
    marginVertical: 4,
    padding: 6,
    zIndex: 10,
    ...theme.shadows.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  clientName: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.text,
  },
  service: {
    fontSize: 10,
    color: theme.colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 9,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  }
});

export default AppointmentCard;
