import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { TaskList } from './TaskList';
import { AddTaskForm } from './AddTaskForm';
import { useState } from 'react';

const Main = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {isFormVisible && (
          <AddTaskForm onClose={() => setIsFormVisible(false)} />
        )}
        <TaskList />

        <View style={styles.spacer} />
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={toggleFormVisibility}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: '20%',
    paddingHorizontal: '5%',
  },
  spacer: {
    height: 70,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6200ee',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    lineHeight: 30,
    fontWeight: 'bold',
  },
});

export { Main };
