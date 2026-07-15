public class Sort {


    public static void swap(int[] arr, int idx1, int idx2){
    /*
    배열 arr 와 자리를 바꿀 두 숫자와 인덱스(위치) idx1 idx2 매개변수로 받음
    */
    int temp = arr[idx1];
    arr[idx1]= arr[idx2];
    arr[idx2]= temp;

    }

    public static void Usort(int[]array, int length){
        for (int i =0; i < length ; i++){ //배열의길이만큼 
            for (int j=0; j< length-i -1; j++){ 
                if(array[j] > array[j+1]){  //인접한 두개..
                    swap(array, j, j+1);
                }

            }

        }
    }
    public static void main(String[] args){
        int[] item = new int[]{5,3,8,1,2,7};

        int nx =6;

        Usort(item, nx);

        for (int data: item){
            System.out.println(data);
        }
    }

}


