<template>
    <div class="flex flex-col">
        <div class="flex flex-row">
            <div class="w-3/5">
                <div class="h-screen">
                    <div ref="codemirror"></div>
                </div>
            </div>
            <div class="w-2/5 p-1 flex flex-col">
                <div class="flex flex-row">
                    <div><el-button @click="validateProfile">Validate Profile</el-button></div>
                </div>
                <div v-if="data.formattingError">{{ data.formattingError }}</div>
                <div v-if="!data.validation.valid" class="text-sm overflow-scroll">
                    <div>The profile is invalid. The following errors were identified.</div>
                    <div v-for="(error, idx) of data.validation.errors" :key="idx">
                        <pre>{{ error }}</pre>
                    </div>
                </div>
                <div v-if="data.validation.valid" class="flex flex-row space-x-2">
                    <div class="text-4xl text-green-500"><i class="fas fa-check"></i></div>
                    <div class="pt-2">the profile is valid</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript, javascriptLanguage } from "@codemirror/lang-javascript";
import { debounce } from "lodash";
import { onMounted, ref, reactive, inject } from "vue";
import { validateProfile as profileValidator } from "./lib.js";

// const $http = inject("$http");
const debouncedValidateProfile = debounce(validateProfile, 500);
let data = reactive({ cm: undefined, validation: [], formattingError: false });

const codemirror = ref(null);
let view;

onMounted(() => {
    ({ view } = setupCodeMirror());
});
function setupCodeMirror() {
    const initialState = EditorState.create({
        doc: data.transcription,
        extensions: [
            basicSetup,
            EditorView.lineWrapping,
            oneDark,
            javascript(),
            javascriptLanguage,
        ],
    });

    const view = new EditorView({
        state: initialState,
        parent: codemirror.value,
    });
    return { view };
}
async function validateProfile() {
    data.formattingError = false;
    data.validation = {};
    let profile = view.state.doc.toString();
    if (!profile) {
        return;
    }
    try {
        profile = JSON.parse(profile);
    } catch (error) {
        data.formattingError = error.message;
        return;
    }
    data.validation = await profileValidator({ profile });
    // let response = await $http.post({
    //     route: "/validate-profile",
    //     body: { profile },
    // });
    // console.log(response);
    // if (response.status === 200) {
    //     data.validation = await response.json();
    // } else {
    //     data.profileValidation = {
    //         errors: [{ message: "profile validation failed with an unknown error" }],
    //     };
    // }
}
</script>

<style>
.cm-editor {
    font-size: 12px;
    height: 100%;
    overflow: scroll;
}
.cm-scroller {
    min-height: 100vh;
    max-height: 100vh;
    overflow: auto;
}
</style>