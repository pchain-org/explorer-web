<template>
    <div class="transition-view relative min-h-screen bg-gray-100 pb-6">
        <div class="container mx-auto px-4">
            <p class="tr-title">{{ title }}</p>
            <p class="for-add">For<span @click="goAddress">{{ address }}</span></p>
            <TransactionsTable v-if="title === 'Transactions'" />
            <TokentxnsTable v-if="title === 'ERC-20 Token Txns'" />
            <TokentxnsErc721Table v-if="title === 'ERC-721 Token Txns'" />
        </div>
    </div>
</template>
<script>
import TransactionsTable from '../../components/Address/Tables/TransactionsTable.vue'
import TokentxnsTable from '../../components/Address/Tables/TokentxnsTable.vue'
import TokentxnsErc721Table from '../../components/Address/Tables/TokentxnsErc721Table.vue'
export default {
    components: {
        TransactionsTable,
        TokentxnsTable,
        TokentxnsErc721Table
    },
    computed: {
        address() {
            return this.$route.params.transaction
        },
        title() {
            return window.sessionStorage.getItem('title-tr') || 'Transactions'
        }
    },
    methods: {
        goAddress() {
            window.location.href = `/address/${this.address}`
        }
    }
}
</script>
<style scoped>
.tr-title {
    font-size: 20px;
    font-weight: 500;
    padding-top: 24px;
    margin-bottom: 12px;
}

.for-add {
    font-size: 16px;
    padding-bottom: 32px;
    border-bottom: 1px solid #eee;
    margin-bottom: 12px;
}

.for-add span {
    font-weight: 500;
    color: #e00585;
    margin-left: 8px;
    cursor: pointer;
}
</style>