import React, { useState } from 'react';
import {
  View,
  TextInput,
  Switch,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { addTaskAction } from '../store/tasks/actions';

type AddTaskFormProps = {
  onClose: () => void;
};

const AddTaskForm = ({ onClose }: AddTaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (title.trim() && description.trim()) {
      setIsSubmitting(true);
      try {
        await dispatch(
          addTaskAction({
            title,
            description,
            importance,
            completed: false,
          }),
        ).unwrap();
        setTitle('');
        setDescription('');
        setImportance(false);
        Keyboard.dismiss();
        onClose();
      } catch (error) {
        console.error('Ошибка при добавлении задачи:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const isFormValid = title.trim() && description.trim();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Добавить новую задачу</Text>

      <Text style={styles.label}>Название задачи*</Text>
      <TextInput
        placeholder="Введите название"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text style={styles.label}>Описание*</Text>
      <TextInput
        placeholder="Введите описание"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.descriptionInput]}
        multiline
        numberOfLines={4}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Важная задача</Text>
        <Switch
          value={importance}
          onValueChange={setImportance}
          trackColor={{ false: '#e0e0e0', true: '#81c784' }}
          thumbColor={importance ? '#4caf50' : '#f5f5f5'}
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isSubmitting || !isFormValid}
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Добавляем...' : 'Добавить задачу'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  switchLabel: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
    lineHeight: 20,
    fontWeight: 'bold',
  },
});

export { AddTaskForm };
