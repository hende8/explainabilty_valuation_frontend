<template>
  <div class="container">
    <br />
    <h1 class="title">Register</h1>
    <br />
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required"
          >Username is required</b-form-invalid-feedback
        >
        <b-form-invalid-feedback v-else-if="!$v.form.username.length"
          >Username length should be between 3-8 characters
          long</b-form-invalid-feedback
        >
        <b-form-invalid-feedback v-if="!$v.form.username.alpha"
          >Username must contains only letters</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group
        id="input-group-firstName"
        label-cols-sm="3"
        label="First name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required"
          >First name is required</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group
        id="input-group-lastName"
        label-cols-sm="3"
        label="Last name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required"
          >Last name is required</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="email"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required"
          >Email is required</b-form-invalid-feedback
        >
        <b-form-invalid-feedback v-else-if="!$v.form.email.valid"
          >Not a valid email</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>Country is required</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required"
          >Password is required</b-form-invalid-feedback
        >
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be
          <strong>strong</strong>. <br />For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
          >Have password length between 5-10 characters
          long</b-form-invalid-feedback
        >
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.charCase"
          >Have at least one number</b-form-invalid-feedback
        >
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.specialCase"
          >Have at least one special character (!@#$^*)</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required"
          >Password confirmation is required</b-form-invalid-feedback
        >
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
          >The confirmed password is not equal to the original
          password</b-form-invalid-feedback
        >
        <br />
      </b-form-group>

      <b-form-group
        id="input-group-ProfilePicture"
        label-cols-sm="3"
        label="Upload profile picture:"
        label-for="ProfilePicture"
      >
        <img
          id="myImg"
          src="https://www.bainbridgedecaturga.com/wp-content/uploads/2019/05/generic-person-icon-1.png"
          width="107"
          height="98"
        />

        <b-form-file
          id="ProfilePicture"
          type="file"
          accept="image/png, image/jpeg"
          @change="uploadProfilePicture($event)"
          :state="validateState('profileImage')"
          class="mt-3"
          ref="fileinput"
          plain
        ></b-form-file>
        <b-form-invalid-feedback v-if="!$v.form.profileImage.required"
          >Profile picture is required</b-form-invalid-feedback
        >
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width: 250px"
        class="ml-5 w-75"
        >Register</b-button
      >
      <div class="mt-2">
        You have an account already?
        <router-link to="login">Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
      >Register failed: {{ form.submitError }}</b-alert
    >
  </div>
</template>

<script>
import app_data from "../assets/app_data";
import axios from "axios";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
} from "vuelidate/lib/validators";
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        profileImage: null,
        submitError: undefined,
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
      resultsPic: null,
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha,
      },
      firstName: {
        required,
        alpha,
      },
      lastName: {
        required,
        alpha,
      },
      country: {
        required,
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        charCase: (p) => {
          return /\d/.test(p) && /[0-9]/.test(p);
        },
        specialCase: (p) => {
          return (
            /\d/.test(p) &&
            /[`~!@#$^&*=|{}':;'<>《》?~！@#￥……&*|{}‘；：”“'。，、？' ']/.test(
              p
            )
          );
        },
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
      email: {
        required,
        email: (u) => email(u),
      },
      profileImage: {
        required,
      },
    },
  },
  created() {
    if (this.$root.store.username) {
      this.$root.store.logout();
    }
    this.countries.push(...app_data.countries);
  },

  methods: {
    async uploadProfilePicture(event) {
      var CLOUD_URL = "https://api.cloudinary.com/v1_1/dtqdljbvk/upload";
      var CLOUD_Preset = "fzh5celi";
      var file = event.target.files[0];
      var formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUD_Preset);
      let response = await axios({
        url: CLOUD_URL,
        method: "POST",
        withCredentials: false,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: formData,
      });
      this.form.profileImage = response.data.secure_url;
      document.getElementById("myImg").src = this.form.profileImage;
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          // "https://assignment3-2-shiran-hen.herokuapp.com/guest/register",
          "http://localhost:3000/guest/register",
          {
            username: this.form.username,
            password: this.form.password,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            country: this.form.country,
            email: this.form.email,
            profileImage: this.form.profileImage,
          }
        );
        if (response.status == "201") {
          this.$router.push("/login");
        }
      } catch (err) {
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        profileImage: null,
      };
      document.getElementById("myImg").src =
        "https://www.bainbridgedecaturga.com/wp-content/uploads/2019/05/generic-person-icon-1.png";
      this.$refs.fileinput.reset();

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
  height: 50%;
  color: whitesmoke;
}
</style>
