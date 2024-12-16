<template>
	<v-card>
		<v-form @submit.prevent="changePassword">
			<v-card-text class="text-center">
				{{ $t('account.changePassword.title') }}
			</v-card-text>
			<v-card-item>
				<div class="card-item">
					<v-text-field
						v-model="changePasswordUser.current"
						:label="$t('account.changePassword.currentPassword')"
						variant="outlined"
						:error-messages="$t(errorMessages.current.message)"
						:type="showPassword.current ? 'text' : 'password'"
						:append-inner-icon="showPassword.current ? 'mdi-eye' : 'mdi-eye-off'"
						@input="errorMessages.current.message = ''"
						@click:append-inner="showPassword.current = !showPassword.current"
					/>
					<v-text-field
						v-model="changePasswordUser.new"
						:label="$t('account.changePassword.newPassword')"
						variant="outlined"
						:error-messages="$t(errorMessages.new.message)"
						:type="showPassword.new ? 'text' : 'password'"
						:append-inner-icon="showPassword.new ? 'mdi-eye' : 'mdi-eye-off'"
						@input="errorMessages.new.message = ''"
						@click:append-inner="showPassword.new = !showPassword.new"
					/>
					<v-text-field
						v-model="changePasswordUser.newRepeat"
						:label="$t('account.changePassword.newPasswordRepeat')"
						variant="outlined"
						:error-messages="$t(errorMessages.newRepeat.message)"
						:type="showPassword.newRepeat ? 'text' : 'password'"
						:append-inner-icon="showPassword.newRepeat ? 'mdi-eye' : 'mdi-eye-off'"
						@input="errorMessages.newRepeat.message = ''"
						@click:append-inner="showPassword.newRepeat = !showPassword.newRepeat"
					/>
					<v-btn type="submit">
						{{ $t('account.changePassword.change') }}
					</v-btn>
				</div>
			</v-card-item>
		</v-form>
	</v-card>
</template>

<script setup lang="ts">
import { userStore } from '~/store/user';
import { ruleCurrentPassword, ruleNewPassword, ruleNewRepeatPassword } from '~/const/validation';
import { validationStore } from '~/store/validation';

const storeUser = userStore();
const storeValidation = validationStore();

const changePasswordUser = ref({
	current: '',
	new: '',
	newRepeat: '',
});

const showPassword = ref({
	current: false,
	new: false,
	newRepeat: false,
});

const errorMessages = ref({
	current: { message: '', options: {} },
	new: { message: '', options: {} },
	newRepeat: { message: '', options: {} },
});

const checkValidationCurrentPassword = (): boolean => {
	const validationRules = ruleCurrentPassword(changePasswordUser.value.current);
	const { isValid, error } = storeValidation.makeCheckRules('current', validationRules);
	errorMessages.value = { ...errorMessages.value, ...error };
	return isValid;
};

const checkValidationNewPassword = (): boolean => {
	const validationRules = ruleNewPassword(changePasswordUser.value.new);
	const { isValid, error } = storeValidation.makeCheckRules('new', validationRules);
	errorMessages.value = { ...errorMessages.value, ...error };
	return isValid;
};

const checkValidationNewRepeatPassword = (): boolean => {
	const validationRules = ruleNewRepeatPassword(changePasswordUser.value.new, [changePasswordUser.value.newRepeat]);
	const { isValid, error } = storeValidation.makeCheckRules('newRepeat', validationRules);
	errorMessages.value = { ...errorMessages.value, ...error };
	return isValid;
};

const changePassword = () => {
	if ([checkValidationNewPassword(), checkValidationCurrentPassword(), checkValidationNewRepeatPassword()].every(Boolean))
		storeUser.changePasswordUser(changePasswordUser.value);
};
</script>

<style scoped lang="scss">
.card-item {
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px auto;
  gap: 8px;
}
</style>
