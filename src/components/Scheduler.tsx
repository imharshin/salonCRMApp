import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { theme } from '../styles/theme';
import { generateTimeSlots, getPositionFromTime, getDurationWidth } from '../utils/timeUtils';
import AppointmentCard from './AppointmentCard';

const SLOT_WIDTH = 100;
const ROW_HEIGHT = 70;

const Scheduler = () => {
  const { config, stylists, appointments } = useSelector((state) => state.scheduler);
  
  const timeSlots = useMemo(() => 
    generateTimeSlots(config.shopOpenTime, config.shopCloseTime, config.slotInterval),
    [config]
  );

  const [toast, setToast] = React.useState<string | null>(null);

  const processedAppointments = useMemo(() => {
    return appointments.map(app => ({
      ...app,
      x: getPositionFromTime(app.start, config.shopOpenTime, config.slotInterval, SLOT_WIDTH),
      width: getDurationWidth(app.start, app.end, config.slotInterval, SLOT_WIDTH)
    }));
  }, [appointments, config]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {/* Stylist Names (Fixed Column) */}
        <View style={styles.stylistSidebar}>
          <View style={styles.headerCell}>
            <Text style={styles.headerCellText}>Stylists</Text>
          </View>
          {stylists.map(stylist => (
            <View key={stylist.id} style={styles.stylistNameCell}>
              <Text style={styles.stylistName}>{stylist.name.split(' ')[0]}</Text>
            </View>
          ))}
        </View>

        {/* Scrollable Timeline */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {/* Time Header */}
            <View style={styles.timeHeader}>
              {timeSlots.map(slot => (
                <View key={slot} style={styles.timeSlotHeader}>
                  <Text style={styles.timeSlotHeaderText}>{slot}</Text>
                </View>
              ))}
            </View>

            {/* Grid Content */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.rowsContainer}>
                {stylists.map(stylist => (
                  <View key={stylist.id} style={styles.stylistRow}>
                    {/* Grid Lines */}
                    {timeSlots.map(slot => (
                      <View key={slot} style={styles.gridCell} />
                    ))}
                    
                    {/* Appointments */}
                    {processedAppointments
                      .filter(app => app.stylistId === stylist.id)
                      .map(app => (
                        <AppointmentCard 
                          key={app.id} 
                          appointment={app} 
                          x={app.x} 
                          width={app.width}
                          color={stylist.color}
                        />
                      ))
                    }
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      
      {toast && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toast}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  gridContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  stylistSidebar: {
    width: 80,
    backgroundColor: theme.colors.surface,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    zIndex: 20,
  },
  headerCell: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerCellText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
  },
  stylistNameCell: {
    height: ROW_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  stylistName: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
  },
  timeHeader: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  timeSlotHeader: {
    width: SLOT_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
  },
  timeSlotHeaderText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  rowsContainer: {
    flex: 1,
  },
  stylistRow: {
    height: ROW_HEIGHT,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: 4,
  },
  gridCell: {
    width: SLOT_WIDTH,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: theme.colors.border + '40', // Very faint line
  },
  toast: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 100,
  },
  toastText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default Scheduler;
