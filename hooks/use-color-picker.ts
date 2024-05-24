import { useState } from 'react';
import { type Colord, colord } from 'colord';
import { colorFormats, isValidColor } from '@/lib/color-converter.models';

type ColorFormatKey = keyof typeof colorFormats;

export function useColorPicker() {
  // Initialize all color format values
  const [colorValues, setColorValues] = useState<Record<ColorFormatKey, string>>(() => {
    const initialColor = colord('#1ea54c');
    const values = {} as Record<ColorFormatKey, string>;

    Object.entries(colorFormats).forEach(([key, format]) => {
      values[key as ColorFormatKey] = format.format(initialColor);
    });

    return values;
  });

  // Validation state for each format
  const [validationErrors, setValidationErrors] = useState<Record<ColorFormatKey, string>>(
    {} as Record<ColorFormatKey, string>
  );

  // Update all color values when one changes
  const updateColorValue = (value: Colord | undefined, omitKey?: ColorFormatKey) => {
    if (!value?.isValid()) {
      return;
    }

    const newValues = {} as Record<ColorFormatKey, string>;
    const newErrors = {} as Record<ColorFormatKey, string>;

    Object.entries(colorFormats).forEach(([key, format]) => {
      const formatKey = key as ColorFormatKey;
      if (formatKey !== omitKey) {
        newValues[formatKey] = format.format(value);
        newErrors[formatKey] = ''; // Clear error for auto-updated fields
      }
    });

    setColorValues((prev) => ({ ...prev, ...newValues }));
    setValidationErrors((prev) => ({ ...prev, ...newErrors }));
  };

  // Handle input changes for text formats
  const handleInputChange = (key: ColorFormatKey, value: string) => {
    // Update the specific field value
    setColorValues((prev) => ({ ...prev, [key]: value }));

    // Validate and update other formats
    if (value.trim() === '') {
      // Clear validation error for empty value
      setValidationErrors((prev) => ({ ...prev, [key]: '' }));
      return;
    }

    const isValid = isValidColor(value, colorFormats[key].parse);
    if (isValid) {
      const parsedColor = colord(value);
      if (parsedColor.isValid()) {
        // Clear error and update other formats
        setValidationErrors((prev) => ({ ...prev, [key]: '' }));
        updateColorValue(parsedColor, key);
      }
    } else {
      // Set validation error
      const format = colorFormats[key];
      setValidationErrors((prev) => ({
        ...prev,
        [key]: `Invalid ${format.label} format. Expected: ${format.placeholder || ''}`,
      }));
    }
  };

  // Handle color picker change
  const handleColorPickerChange = (color: string) => {
    const parsedColor = colord(color);
    if (parsedColor.isValid()) {
      // Update picker value and all other formats
      setColorValues((prev) => ({ ...prev, picker: color }));
      updateColorValue(parsedColor, 'picker');
    }
  };

  // Get validation state for a format
  const getValidation = (key: ColorFormatKey) => {
    const error = validationErrors[key] || '';
    return {
      error,
      isValid: !error,
    };
  };

  return {
    colorValues,
    setColorValues,
    handleInputChange,
    handleColorPickerChange,
    getValidation,
    formats: colorFormats,
  };
}
