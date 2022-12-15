<template>
    <div class="flex flex-col">
        <div class="flex flex-row p-2 bg-blue-200">
            <div>Describo :: Profile Validator</div>
            <div class="flex flex-grow"></div>
            <div>
                <a href="https://github.com/describo/profiles">
                    <i class="fa-brands fa-github"></i>
                    Describo Profiles Repository
                </a>
            </div>
        </div>

        <profile-checker-component class="max-height" />
    </div>
</template>

<script setup>
import ProfileCheckerComponent from "./ProfileChecker.component.vue";
</script>

<style scoped>
.max-height {
    max-height: 95vh;
}
</style>
