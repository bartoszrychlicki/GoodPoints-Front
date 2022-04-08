<template>
  <form>
    <div class="mb-3">
      <label for="name" class="form-label">Imię:</label>
      <input class="form-control" type="text" name="name" />
    </div>
    <div class="mb-3">
      <label class="form-label" for="email">E-mail:</label>
      <input class="form-control" type="email" name="email" />
    </div>
    <div class="mb-3 row">
      <div class="col">
        <label class="form-label" for="password">Hasło </label>
        <input class="form-control" type="password" name="password" />
      </div>
      <div class="col">
        <label class="form-label" for="passsword_confirm">Powtórz hasło </label>
        <input class="form-control" type="password" name="password_confirm" />
      </div>
    </div>
    <input class="btn btn-primary" type="submit" value="Zarejestruj się" />
  </form>
</template>

<script>
  export default {}
</script>

<style scoped></style>
