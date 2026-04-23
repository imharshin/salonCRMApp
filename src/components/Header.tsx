import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { switchUser } from '../store/authSlice';
import { theme } from '../styles/theme';
import { Settings, ChevronDown, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);
  const allUsers = useSelector(state => state.auth.allUsers);
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f8fafc']}
        style={styles.gradient}
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.title}>Salon CRM</Text>
            <TouchableOpacity 
              style={styles.userSelector}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.userName}>{currentUser.name}</Text>
              <ChevronDown size={14} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.rightActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Settings size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{currentUser.name.charAt(0)}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Switch User</Text>
            <FlatList
              data={allUsers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.userItem,
                    item.id === currentUser.id && styles.activeUserItem
                  ]}
                  onPress={() => {
                    dispatch(switchUser(item.id));
                    setModalVisible(false);
                  }}
                >
                  <User size={18} color={item.id === currentUser.id ? theme.colors.primary : theme.colors.textSecondary} />
                  <Text style={[
                    styles.userItemText,
                    item.id === currentUser.id && styles.activeUserItemText
                  ]}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  gradient: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  userSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  userName: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginRight: 4,
    fontWeight: '500',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  activeUserItem: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 8,
  },
  userItemText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  activeUserItemText: {
    color: theme.colors.primary,
    fontWeight: '600',
  }
});

export default Header;
