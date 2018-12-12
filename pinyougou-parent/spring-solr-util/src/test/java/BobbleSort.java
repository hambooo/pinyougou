public class BobbleSort {
    public static void main(String[] args) {
        int[] array = {3,2,5,8,6,3,2};
        for (int i = 0; i < array.length; i++) {
            for(int j = 0;j<array.length-1-i; j++){//最大的元素排在最后
                if(array[j]>array[j+1]){
                    int temp;
                     temp = array[j];
                     array[j] = array[j+1];
                     array[j+1] = temp;
                }
            }
        }

        for (int i : array) {
            System.out.print(i);
        }
    }
}
