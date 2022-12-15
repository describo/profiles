<template>
    <div class="flex flex-col">
        <div class="flex flex-row">
            <div class="w-3/5">
                <div class="">
                    <div ref="codemirror"></div>
                </div>
            </div>
            <div class="w-2/5 p-1 flex flex-col">
                <div class="flex flex-row"></div>
                <div><el-button @click="validateProfile">Validate Profile</el-button></div>
                <div v-if="!data.validation.valid" class="text-2xl overflow-scroll">
                    <div>The profile is invalid. The following errors were identified.</div>
                </div>
                <div v-if="data.validation.valid" class="flex flex-row space-x-2">
                    <div class="text-4xl text-green-500"><i class="fas fa-check"></i></div>
                    <div class="pt-2">the profile is valid</div>
                </div>
                <div v-for="(error, idx) of data.validation.errors" :key="idx">
                    <pre>{{ error }}</pre>
                </div>
                <div v-if="data.formattingError">{{ data.formattingError }}</div>
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

const debouncedValidateProfile = debounce(validateProfile, 500);
let data = reactive({ cm: undefined, validation: [], formattingError: false });

const codemirror = ref(null);
let view;

onMounted(() => {
    ({ view } = setupCodeMirror());
});
function setupCodeMirror() {
    const initialState = EditorState.create({
        doc: "",
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
}
</script>

<style>
.cm-editor {
    font-size: 12px;
    height: 100%;
    overflow: scroll;
}
.cm-scroller {
    min-height: 95vh;
    max-height: 95vh;
    overflow: auto;
}
</style>
