import unittest

# Пример функции для поиска простых чисел
def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

class TestPrimeFunction(unittest.TestCase):

    # Проверка для небольших значений N
    def test_small_values(self):
        # Пример с числом 10
        self.assertFalse(is_prime(10))  # 10 не простое число
        # Пример с числом 20
        self.assertFalse(is_prime(20))  # 20 не простое число

    # Проверка для больших значений N
    def test_large_values(self):
        # Пример с числом 1000
        self.assertFalse(is_prime(1000))  # 1000 не простое число
        # Пример с числом 10000
        self.assertFalse(is_prime(10000))  # 10000 не простое число

    # Проверка для значений N, равных 1 или 0
    def test_zero_and_one(self):
        self.assertFalse(is_prime(0))  # 0 не простое число
        self.assertFalse(is_prime(1))  # 1 не простое число

    # Проверка, что программа правильно определяет простые числа
    def test_prime_numbers(self):
        self.assertTrue(is_prime(2))  # 2 - простое число
        self.assertTrue(is_prime(3))  # 3 - простое число
        self.assertTrue(is_prime(5))  # 5 - простое число
        self.assertTrue(is_prime(7))  # 7 - простое число
        self.assertTrue(is_prime(13)) # 13 - простое число

    # Проверка для составных чисел
    def test_composite_numbers(self):
        self.assertFalse(is_prime(4))  # 4 не простое число
        self.assertFalse(is_prime(6))  # 6 не простое число
        self.assertFalse(is_prime(8))  # 8 не простое число
        self.assertFalse(is_prime(9))  # 9 не простое число

if __name__ == "__main__":
    unittest.main()
    
