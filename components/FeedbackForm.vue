<script lang="ts" setup>
  interface FormData {
    id?: string; // The ID can be optional because it will not be set until submission
    name: string;
    email: string;
    phone: string;
    city: string;
    subject: string;
    message: string;
    terms: boolean;
  }

  // Define a reactive property to store the form data
  const formData = ref<FormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    subject: "",
    message: "",
    terms: false,
  });

  // Reactive property to track if the form has been submitted
  const formSubmitted = ref(false);

  // Define a reactive property for a message to display if the terms are not accepted
  const termMessage = ref<string>("Пожалуйста, примите условия ");

  // Define a reactive property to show that the form has been submitted successfully
  const successMessage = ref("");

  // Define a function to access the submissions store
  const useSubmissionsStore = () => {
    // The useState function takes a unique key and an initializer function
    const submissions = useState<FormData[]>("submissions", () => []);
    return { submissions };
  };

  // Define a reactive property to store the submissions
  const { submissions } = useSubmissionsStore();

  // Define a method to submit the form
  const submitForm = async () => {
    formSubmitted.value = true; // Set to true on form submit attempt

    if (formData.value.terms) {
      try {
        // Generate a unique ID using the current timestamp and a random number
        const uniqueId = `id-${Date.now()}-${Math.floor(
          Math.random() * 10000
        )}`;

        // Add the formData to submissions with the unique ID
        submissions.value.push({
          id: uniqueId, // Include the unique ID
          ...formData.value,
        });

        console.log("Current Submissions:", submissions.value);

        // Update the success message with the unique ID
        successMessage.value = `Форма успешно отправлена! Ваш номер заявки: ${uniqueId}`;

        // Reset formData and formSubmitted after successful submission
        formData.value = {
          name: "",
          email: "",
          phone: "",
          city: "",
          subject: "",
          message: "",
          terms: false,
        };
        formSubmitted.value = false;

        // Handle additional logic for successful submission (e.g., showing a success message)
      } catch (error) {
        // Handle errors
        console.error("Form submission failed:", error);
      }
    } else {
      // Inform the user they must agree to the terms
      console.error("Please agree to the terms.");
    }
  };
</script>

<template>
  <div
    class="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24"
  >
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-4xl mx-auto"
      @submit.prevent="submitForm"
    >
      <h2
        class="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-3"
      >
        Форма обратной связи
      </h2>
      <p class="text-gray-600 mb-6">
        Мы всегда готовы ответить на любой вопрос, а также услышать ваши отзывы
        и предложения по работе нашего сервиса
      </p>

      <div class="flex flex-wrap -mx-3">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Ваше имя
          </label>
          <input
            v-model="formData.name"
            class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            autocomplete="name"
            required
            placeholder="Новожилова Ирина"
          />
        </div>

        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            E-mail
          </label>
          <input
            v-model="formData.email"
            class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            autocomplete="email"
            required
            placeholder="novozhilova_irina@gmail.com"
          />
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
            Телефон
          </label>
          <input
            v-model="formData.phone"
            class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            autocomplete="tel"
            required
            placeholder="+7 (927) 627 88 99"
          />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="city">
            Город
          </label>
          <input
            v-model="formData.city"
            class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            placeholder="Астана"
          />
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="subject">
          Тема обращения
        </label>
        <select
          v-model="formData.subject"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          id="subject"
        >
          <option>Отзывы и предложения</option>
          <option>Вопрос по контенту</option>
          <option>Неточность в описании товара</option>
          <option>Обмен и возврат</option>
        </select>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="message">
          Сообщение
        </label>
        <textarea
          v-model="formData.message"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          rows="4"
          placeholder="Ваше сообщение"
        ></textarea>
      </div>
      <div class="mb-6">
        <input
          v-model="formData.terms"
          class="mr-2 leading-tight"
          type="checkbox"
          id="terms"
        />
        <label class="text-sm" for="terms">
          Согласен с условиями
          <NuxtLink href="#" class="text-blue-500"
            >политики обработки персональных данных</NuxtLink
          >
        </label>
      </div>
      <div class="flex items-center justify-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-16 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
          type="submit"
        >
          Отправить
        </button>
      </div>
      <div v-auto-animate>
        <!-- Only show this message if the form has been submitted and terms are not accepted -->
        <p
          class="text-red-500 text-xs italic"
          v-if="formSubmitted && !formData.terms"
        >
          {{ termMessage }}
        </p>
      </div>

      <!-- Display the success message if it's not empty -->
      <div
        v-if="successMessage"
        class="mt-4 p-4 bg-green-100 text-green-800 rounded"
        v-auto-animate
      >
        {{ successMessage }}
      </div>

      <!-- Debugging output to display the submissions -->
      <!-- <pre class="mt-4 bg-gray-100 p-4 rounded">
        <p>Debugging output to display the submissions</p>
      {{ submissions }}
    </pre> -->
    </form>
  </div>
</template>

<style scoped></style>
